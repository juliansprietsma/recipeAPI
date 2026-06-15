from pydantic import BaseModel
import datetime

from . import IngredientSummary, IngredientCreate

class RecipeBase(BaseModel):

    class Config:
        from_attributes = True

class RecipeSummary(RecipeBase):
    id: int
    name: str

class Recipe(RecipeBase):
    id: int
    name: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: str
    ingredients: list[IngredientSummary]

class RecipeCreate(RecipeBase):
    name: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: str
    ingredients: list[IngredientCreate]