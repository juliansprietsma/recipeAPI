from fastapi import FastAPI
from app.routers import ingredients
from app.routers import recipes

from app.models.recipes import Base as recipesBase
from app.models.recipes import engine as recipesEngine

from app.models.ingredients import Base as ingredientsBase
from app.models.ingredients import engine as ingredientsEngine

from app.models.ingredients_recipes import Base as irBase
from app.models.ingredients_recipes import engine as irEngine

app = FastAPI()

app.include_router(recipes.router)
app.include_router(ingredients.router)

recipesBase.metadata.create_all(bind=recipesEngine)
ingredientsBase.metadata.create_all(bind=ingredientsEngine)
irBase.metadata.create_all(bind=irEngine)

@app.get("/")
async def root():
    return {"message": "root of the application"}