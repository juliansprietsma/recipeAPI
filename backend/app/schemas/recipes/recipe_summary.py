from .recipe_base import RecipeBase
import datetime

class RecipeSummary(RecipeBase):
    name: str
    url: str
    cookTime: datetime.timedelta