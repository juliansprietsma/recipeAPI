from fastapi import FastAPI
from app.routers import recipes
from app.models.recipes import Base, engine

app = FastAPI()

app.include_router(recipes.router)

Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "root of the application"}