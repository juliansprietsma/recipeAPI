from .recipe_base import RecipeBase
from ..ingredients.ingredient_create import IngredientCreate
from ..steps.step_create import StepCreate
import datetime

class RecipeCreate(RecipeBase):
    name: str
    url: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: list[StepCreate]
    ingredients: list[IngredientCreate]