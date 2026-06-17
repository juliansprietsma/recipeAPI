from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.app.database import get_db
from ..schemas.ingredients import Ingredient, IngredientSummary, IngredientCreate
from ..models import ingredients as ingredientModels
from ..crud.ingredient import IngredientController
from ..crud import ObjectNotFoundException

router = APIRouter(
    prefix="/ingredients",
    tags=["Ingredients"]
)

@router.get("/{id}", response_model=Ingredient)
async def get_ingredient(id: int, controller: IngredientController = Depends(IngredientController)):
    try:
        ingredient = controller.get_ingredient(id)
    except ObjectNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Ingredient with this id ({id}) does not exist")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
    return ingredient