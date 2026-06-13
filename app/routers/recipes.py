from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_recipes():
    """
        Gets a list of recipes
    """

    return {"message": "test"}