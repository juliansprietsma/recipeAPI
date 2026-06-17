from backend.app.database import Base, engine
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship

from .ingredients_recipes import ingredients_recipes_table

class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column("Id", Integer, primary_key=True, autoincrement=True, index=True, nullable=False)
    name = Column("Name", String, nullable=False)
    amount = Column("Amount", Float, nullable=False)
    unit = Column("Unit", String, nullable=True)

    recipes = relationship(
        "Recipe", secondary=ingredients_recipes_table, back_populates="ingredients"
    )