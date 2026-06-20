from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from ..database import Base, engine
from .recipes import Recipe

class Steps(Base):
    __tablename__ = "steps"

    id = Column("id", Integer, primary_key=True, index=True, autoincrement=True)
    stepNr = Column("step_number", Integer, nullable=False)
    step = Column("step", Text, nullable=False)
    recipeId = Column("recipeId", Integer, ForeignKey("recipes.Id"))

    recipes = relationship("Recipe", back_populates="steps")