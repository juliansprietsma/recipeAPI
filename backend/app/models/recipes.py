from ..database import Base, engine
from sqlalchemy import Column, Integer, String, Interval, Text
from sqlalchemy.orm import relationship

from .ingredients_recipes import ingredients_recipes_table

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column("Id", Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    name = Column("Name", String, nullable=False)
    cookTime = Column("Cooking_time", Interval, nullable=False)
    prepTime = Column("Preparation_time", Interval, nullable=True)
    steps = relationship("Steps", back_populates="recipes")
    url = Column("URL", String, nullable=True)
    image = Column("Image", String, nullable=True)

    ingredients = relationship(
        "Ingredient", secondary=ingredients_recipes_table, back_populates="recipes"
    )