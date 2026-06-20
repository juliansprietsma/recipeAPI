from ..database import Base, engine

from sqlalchemy import Column, Table, Integer, ForeignKey

ingredients_recipes_table = Table(
    "ingredientsRecipes",
    Base.metadata,
    Column("IngredientsId", ForeignKey("ingredients.Id"), primary_key=True),
    Column("RecipesId", ForeignKey("recipes.Id"), primary_key=True),
)