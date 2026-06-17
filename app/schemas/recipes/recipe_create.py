from .recipe_base import RecipeBase
from ..ingredients.ingredient_create import IngredientCreate
import datetime

class RecipeCreate(RecipeBase):
    name: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: str
    ingredients: list[IngredientCreate]