from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from ..schemas.ingredients import IngredientSummary, IngredientCreate
from app.models import ingredients as ingredientModels

router = APIRouter(
    prefix="/ingredients",
    tags=["Ingredients"]
)

@router.get("/", response_model=List[IngredientSummary])
async def get_ingredients(db: Session = Depends(get_db)):

    ingredients = db.query(ingredientModels.Ingredient).all()

    serialized_ingredients = []
    for ingredient in ingredients:
        serialized_ingredient = IngredientSummary(**ingredient.__dict__)
        serialized_ingredients.append(serialized_ingredient)
    
    return ingredients

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=List[IngredientCreate])
async def create_ingredient(ingredient: IngredientCreate, db: Session = Depends(get_db)):
    new_ingredient = ingredientModels.Ingredient(**ingredient.__dict__)
    db.add(new_ingredient)
    db.commit()
    db.refresh(new_ingredient)

    return [new_ingredient]