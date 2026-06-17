from .ingredient_base import IngredientBase
from ..recipes.recipe_summary import RecipeSummary

class Ingredient(IngredientBase):
    id: int
    name: str
    amount: float
    unit: str
    recipes: list[RecipeSummary] = None
