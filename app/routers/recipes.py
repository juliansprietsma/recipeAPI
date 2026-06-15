from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import recipes as recipeModels
from app.schemas import recipes as recipeSchemas

router = APIRouter(
    prefix="/recipes",
    tags=["Recipes"]
)


@router.get("/", response_model=List[recipeSchemas.RecipeSummary])
async def get_recipes(db: Session = Depends(get_db)):
    """
        Gets a list of recipes
    """

    recipes = db.query(recipeModels.Recipe).all()

    serialized_recipes = []
    for recipe in recipes:
        serialized_recipe = recipeSchemas.RecipeSummary(**recipe.__dict__)
        serialized_recipes.append(serialized_recipe)

    return recipes


@router.get("/{id}", response_model=recipeSchemas.Recipe, status_code=status.HTTP_200_OK)
async def get_recipe(id: int, db: Session = Depends(get_db)):
    recipe = db.query(recipeModels.Recipe).filter(recipeModels.Recipe.id == id).first()

    if recipe is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Id: {id} does not exist")
    
    return recipe


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=List[recipeSchemas.RecipeCreate])
async def create_recipe(recipe: recipeSchemas.RecipeCreate, db: Session = Depends(get_db)):
    new_recipe = recipeModels.Recipe(**recipe.__dict__)
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)

    return [new_recipe]


