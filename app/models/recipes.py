from app.database import Base, engine
from sqlalchemy import Column, Integer, String, Interval, Text

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    name = Column(String, nullable=False)
    cookTime = Column(Interval, nullable=False)
    prepTime = Column(Interval, nullable=True)
    steps = Column(Text, nullable=True)