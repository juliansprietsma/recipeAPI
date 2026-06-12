from fastapi import FastAPI
from app.routers import recipes
from app.database.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(recipes.router)

@app.get("/")
async def root():
    return {"message": "root of the application"}