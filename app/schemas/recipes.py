from pydantic import BaseModel
import datetime

class RecipeBase(BaseModel):

    class Config:
        from_attributes = True

class RecipeSummary(RecipeBase):
    id: int
    name: str

    class Config:
        from_attributes = True

class Recipe(RecipeBase):
    id: int
    name: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: str

    class Config:
        from_attributes = True

class RecipeCreate(RecipeBase):
    name: str
    cookTime: datetime.timedelta
    prepTime: datetime.timedelta
    steps: str

    class Config:
        from_attributes = True