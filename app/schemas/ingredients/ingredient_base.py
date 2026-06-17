from pydantic import BaseModel

class IngredientBase(BaseModel):

    class Config:
        from_attributes = True