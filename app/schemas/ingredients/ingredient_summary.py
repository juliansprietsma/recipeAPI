from .ingredient_base import IngredientBase

class IngredientSummary(IngredientBase):
    id: int
    name: str
    amount: float
    unit: str