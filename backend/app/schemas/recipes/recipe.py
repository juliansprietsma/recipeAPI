import datetime

from .recipe_base import RecipeBase
from ..ingredients.ingredient_summary import IngredientSummary

class Recipe(RecipeBase):
    id: int
    name: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: str
    ingredients: list[IngredientSummary]
