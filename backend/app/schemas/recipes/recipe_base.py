from pydantic import BaseModel

class RecipeBase(BaseModel):

    class Config:
        from_attributes = True