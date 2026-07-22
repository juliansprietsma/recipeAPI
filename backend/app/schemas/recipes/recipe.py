import datetime

from .recipe_base import RecipeBase
from ..ingredients.ingredient_summary import IngredientSummary
from ..steps.step_summary import StepSummary
 
class Recipe(RecipeBase):
    id: int
    name: str
    url: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: list[StepSummary]
    ingredients: list[IngredientSummary]
    image: str