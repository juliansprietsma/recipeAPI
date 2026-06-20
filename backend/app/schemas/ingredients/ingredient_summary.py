from .ingredient_base import IngredientBase

class IngredientSummary(IngredientBase):
    name: str
    amount: float
    unit: str