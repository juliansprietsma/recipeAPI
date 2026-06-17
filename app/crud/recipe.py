from fastapi import Depends
from sqlalchemy.orm import Session, Query

from ..database import get_db
from ..models.recipes import Recipe
from ..schemas.recipes import RecipeCreate
from .controller import Controller
from .ingredient import IngredientController
from . import ObjectNotFoundException, AlreadyExistsException


class RecipeController(Controller):
    def __init__(self, db: Session = Depends(get_db)):
        super().__init__(db)

        self.ingredients_controller = IngredientController(db)

    def get_recipes(self):
        query = self.db.query(Recipe).all()

        return query
    
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

        db_recipe = Recipe(
            name=recipe.name,
            cookTime=recipe.cookTime,
            prepTime=recipe.prepTime,
            steps=recipe.steps,
            ingredients=db_ingredients
        )

        self.db.add(db_recipe)
        self.db.commit()
        self.db.refresh(db_recipe)
        return db_recipe

    