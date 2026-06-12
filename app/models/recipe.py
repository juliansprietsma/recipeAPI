from app.database.database import Base
from sqlalchemy import Column, Integer, String


class Recipe(Base):
    __tablename__ = "recipe"

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String, index=True)