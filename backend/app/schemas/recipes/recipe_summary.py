from .recipe_base import RecipeBase

class RecipeSummary(RecipeBase):
    id: int
    name: str
    url: str