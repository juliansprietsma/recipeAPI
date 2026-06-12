from fastapi import APIRouter

router = APIRouter()

@router.get("", tags=["Recipes"])
async def get_recipes():
    """
        Gets a list of recipes
    """

    return {"message": "test"}