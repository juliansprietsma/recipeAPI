from fastapi import FastAPI
from .routers import ingredients
from .routers import recipes

from .models.recipes import Base as recipesBase
from .models.recipes import engine as recipesEngine

from .models.ingredients import Base as ingredientsBase
from .models.ingredients import engine as ingredientsEngine

from .models.ingredients_recipes import Base as irBase
from .models.ingredients_recipes import engine as irEngine

from .models.steps import Base as stepsBase
from .models.steps import engine as stepsEngine

app = FastAPI(
    title="RecipeAPI",
    version="0.0.1a"
)

app.include_router(recipes.router)
app.include_router(ingredients.router)

recipesBase.metadata.create_all(bind=recipesEngine)
ingredientsBase.metadata.create_all(bind=ingredientsEngine)
irBase.metadata.create_all(bind=irEngine)
stepsBase.metadata.create_all(bind=stepsEngine)

@app.get("/")
async def root():
    return {"message": "root of the application"}