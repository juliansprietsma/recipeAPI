from .recipe_base import RecipeBase
import datetime

class RecipeSummary(RecipeBase):
    id: int
    name: str
    url: str
    cookTime: datetime.timedelta
    image: str