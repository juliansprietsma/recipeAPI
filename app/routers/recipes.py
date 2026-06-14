from fastapi import APIRouter

router = APIRouter(
    prefix="/recipes"
)


@router.get("/")
async def get_recipes():
    """
        Gets a list of recipes
    """

    return {"message": "test"}