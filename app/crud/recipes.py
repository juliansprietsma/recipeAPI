from sqlalchemy.orm import Session
from app.models import recipe as recipe_model
from app.schemas import recipes as recipe_schema
from app.crud.controller import Controller

class RecipeController(Controller):
    
    def get_recipe(db: Session, recipe_id: int):
        return db.query(recipe_model.Recipe).filter(recipe_model.Recipe.id == recipe_id).first()

    def get_recipes(db: Session, skip: int = 0, limit: int = 10):
        return db.query(recipe_model.Recipe).offset(skip).limit(limit).all()

    def create_recipe(db: Session, recipe: recipe_schema.RecipeCreate):
        db_recipe = recipe_model.Recipe(name=recipe.name)
        db.add(db_recipe)
        db.commit()
        db.refresh(db_recipe)
        return db_recipe