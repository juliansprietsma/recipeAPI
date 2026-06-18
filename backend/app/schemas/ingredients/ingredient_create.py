from .ingredient_base import IngredientBase

class IngredientCreate(IngredientBase):
    name: str
    amount: float
    unit: str