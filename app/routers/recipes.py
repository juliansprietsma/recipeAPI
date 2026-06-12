from fastapi import APIRouter, status
from app.models.recipe import Recipe as recipe_model

router = APIRouter(
    prefix="/recipes",
    tags=["Recipes"],
    responses={
        status.HTTP_200_OK: {
            "description": "Request succesfullll"
        }
    }
)

@router.get("")
async def get_recipes():
    """
        Gets a list of recipes
    """

    return {"message": "test"}