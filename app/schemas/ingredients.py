from pydantic import BaseModel
from . import RecipeSummary

class IngredientBase(BaseModel):

    class Config:
        from_attributes = True

class Ingredient(IngredientBase):
    id: int
    name: str
    amount: float
    unit: str
    recipes: list[RecipeSummary] = None

class IngredientCreate(IngredientBase):
    name: str
    amount: float
    unit: str

class IngredientSummary(IngredientBase):
    id: int
    name: str
    amount: float
    unit: str