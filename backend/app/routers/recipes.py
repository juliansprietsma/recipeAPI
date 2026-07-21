from fastapi import APIRouter, Depends, status, HTTPException, File, UploadFile
from fastapi import Query as fQuery
from typing import List, Annotated
from sqlalchemy.orm import Session, Query
from pathlib import Path
from uuid import uuid4

from ..database import get_db
from ..models import recipes as recipeModels
from ..schemas.recipes import RecipeSummary, RecipeCreate, Recipe
from ..schemas.steps import StepSummary
from ..schemas.ingredients import IngredientSummary
from ..crud.recipe import RecipeController
from ..crud.step import StepController
from ..crud.ingredient import IngredientController
from ..crud import ObjectNotFoundException, MultipleInstancesFoundException, AlreadyExistsException

router = APIRouter(
    prefix="/recipes",
    tags=["Recipes"]
)


@router.get("/", response_model=List[RecipeSummary])
async def get_recipes(
    name: str = None,
    cookTime: str = None,
    ingredients: Annotated[list[str] | None, fQuery()] = None,
    controller: RecipeController = Depends(RecipeController)
):
    try:
        recipes = controller.get_recipes(name, cookTime, ingredients)

        serialized_recipes = []
        for recipe in recipes:
            serialized_recipe = RecipeSummary(**recipe.__dict__)
            serialized_recipes.append(serialized_recipe)

        return serialized_recipes
    except ObjectNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.get("/{id}", response_model=Recipe, status_code=status.HTTP_200_OK)
async def get_recipe(id: int, controller: RecipeController = Depends(RecipeController)):

    try:
        recipe = controller.get_recipe(id)

        return Recipe(
            id = recipe.id,
            name = recipe.name,
            cookTime = recipe.cookTime,
            prepTime = recipe.prepTime,
            steps = recipe.steps,
            url = recipe.url,
            ingredients = recipe.ingredients,
            image = recipe.image
        )
    except ObjectNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe with this ID has not been found"
        )
    
@router.get("/{id}/ingredients", response_model=List[IngredientSummary])
async def get_recipe_ingredients(id: int,
                                 controller: IngredientController = Depends(IngredientController)):
    
    try:
        ingredients = controller.get_ingredients_by_recipe(id)

        serialized_ingredients = []
        for ingredient in ingredients:
            serialized_ingredient = IngredientSummary(**ingredient.__dict__)
            serialized_ingredients.append(serialized_ingredient)

        return serialized_ingredients
    except ObjectNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
    
@router.get("/{id}/steps", response_model=List[StepSummary])
async def get_recipe_steps(id: int, 
                           stepNr: int  = None,
                           controller: StepController = Depends(StepController)):

    try:
        steps = controller.get_steps_by_recipe(id, stepNr)

        serialized_steps = []
        for step in steps:
            serialized_step = StepSummary(**step.__dict__)
            serialized_steps.append(serialized_step)

        return serialized_steps
    except ObjectNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.put("/{id}/image")
async def upload_image(
    id: int,
    file: UploadFile = File(...),
    controller: RecipeController = Depends(RecipeController)):
    
    try:
        recipe = controller.upload_image(id, file)
        return recipe
    except ObjectNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.post("/upload_default_image")
async def upload_default_image(
    file: UploadFile = File(...),
    controller: RecipeController = Depends(RecipeController)):

    try:
        recipe = controller.upload_default_image(file)
        return recipe
    except AlreadyExistsException as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=int)
async def create_recipe(recipe: RecipeCreate, controller: RecipeController = Depends(RecipeController)):

    try:
        recipe = controller.create_recipe(recipe)
        return recipe.id
    except ObjectNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except MultipleInstancesFoundException as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
@router.put("/set_image")
async def set_image(id: int, image: str, controller: RecipeController = Depends(RecipeController)):
    try:
        recipe = controller.set_image_manually(id, image)
        return recipe
    except ObjectNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    

