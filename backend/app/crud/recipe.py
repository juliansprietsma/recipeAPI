from fastapi import Depends, Query, File
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Annotated
import datetime
from pathlib import Path
from uuid import uuid4
import shutil

from ..database import get_db
from ..models.recipes import Recipe
from ..models.ingredients import Ingredient
from ..schemas.recipes import RecipeCreate
from .controller import Controller
from .ingredient import IngredientController
from .step import StepController
from . import ObjectNotFoundException, AlreadyExistsException


class RecipeController(Controller):
    def __init__(self, db: Session = Depends(get_db)):
        super().__init__(db)

        self.ingredients_controller = IngredientController(db)
        self.step_controller = StepController(db)
        self.upload_dir = Path("/data/images")
        self.upload_dir.mkdir(exist_ok=True, parents=True)


    def get_recipes(self, 
                    name: str, 
                    cookTime: str, 
                    ingredients: Annotated[list[str] | None, Query()]):
        
        query = self.db.query(Recipe)

        if name:
            query = query.filter(Recipe.name.icontains(name))
        if cookTime:
            t = datetime.datetime.strptime(cookTime, "%H:%M:%S")
            ct = datetime.timedelta(hours=t.hour, minutes=t.minute, seconds=t.second)

            query = query.filter(Recipe.cookTime <= ct)
        if ingredients:
            ingredients = [ingredient.lower() for ingredient in ingredients]
            query = (query.join(Recipe.ingredients)
                    .where(func.lower(Ingredient.name).in_(ingredients))
                    .group_by(Recipe.id)
                    .having(func.count(func.distinct(Ingredient.id)) == len(ingredients)))

        if query.count() < 1:
            raise ObjectNotFoundException("No recipes found")


        return query.all()
    
    def get_recipe(self, recipe_id: int):
        db_recipes: Query = self.db.query(Recipe).filter(Recipe.id == recipe_id)
        if db_recipes.count() < 1:
            raise ObjectNotFoundException("The requested recipe does not exist")
        
        return db_recipes.first()
    
    def create_recipe(self, recipe: RecipeCreate):
        query = self.db.query(Recipe).filter(
            Recipe.name == recipe.name,
        )
        
        if query.count() > 0:
            raise AlreadyExistsException("A recipe with this name already exists")
        
        db_ingredients = []
        for ingredient in recipe.ingredients:
            db_ingredient = self.ingredients_controller.create_or_retrieve_ingredient(
                ingredient_name=ingredient.name,
                ingredient_amount=ingredient.amount,
                ingredient_unit=ingredient.unit
            )
            db_ingredients.append(db_ingredient)

        db_steps = []
        for step in recipe.steps:
            db_step = self.step_controller.create_step(
                stepNr=step.stepNr,
                step=step.step
            )
            db_steps.append(db_step)

        db_recipe = Recipe(
            name=recipe.name,
            cookTime=recipe.cookTime,
            prepTime=recipe.prepTime,
            steps=db_steps,
            url=recipe.url,
            ingredients=db_ingredients,
            image = ""
        )

        self.db.add(db_recipe)
        self.db.commit()
        self.db.refresh(db_recipe)
        return db_recipe

    def set_image_manually(self, id: int, image: str):
        try:
            recipe = self.get_recipe(id)
        except Exception as e:
            raise ObjectNotFoundException(e.message)
        
        recipe.image = image

        self.db.add(recipe)
        self.db.commit()
        self.db.refresh(recipe)

        return recipe

    def upload_image(self, id: int, image: File):
        try:
            recipe = self.get_recipe(id)
        except Exception as e:
            raise ObjectNotFoundException(e.message)

        extension = Path(image.filename).suffix
        filename = f"{uuid4()}{extension}"

        fileDestination = self.upload_dir / filename

        with fileDestination.open("wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        recipe.image = filename

        self.db.add(recipe)
        self.db.commit()
        self.db.refresh(recipe)

        return recipe
    
    def upload_default_image(self, image: File):
        extension = Path(image.filename).suffix
        filename = f"default{extension}"

        fileDestination = self.upload_dir / filename

        if Path(f"/data/images/{filename}").is_file():
            raise AlreadyExistsException(f"Default file already exists under the name: {filename}")

        with fileDestination.open("wb") as buffer:
            shutil.copyfileobj(image.file, buffer)