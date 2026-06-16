from sqlalchemy.orm import Query

from . import ObjectNotFoundException, MultipleInstancesFoundException
from .controller import Controller
from ..models.ingredients import Ingredient

class IngredientController(Controller):
    def get_ingredient(self, ingredient_id: int):
        ingredients: Query = self.db.query(Ingredient).filter(Ingredient.id == ingredient_id)
        if ingredients.count() < 1:
            raise ObjectNotFoundException("The ingredient with the given ID does not exist")
        
        return ingredients.first()
    
    def get_ingredient_by_properties(self, ingredient_name: str, ingredient_amount: float, ingredient_unit: str):
        
        ingredients: Query = self.db.query(Ingredient)

        if ingredient_name:
            ingredients.filter(Ingredient.name == ingredient_name)
        if ingredient_amount:
            ingredients.filter(Ingredient.amount == ingredient_amount)
        if ingredient_unit:
            ingredients.filter(Ingredient.unit == ingredient_unit)

        if ingredients.count() < 1:
            raise ObjectNotFoundException("The ingredient with the given ID does not exist")
        elif ingredients.count() > 1:
            print(ingredients.all())
            raise MultipleInstancesFoundException(f"Multiple ingredients with name {ingredient_name} found")
        
        return ingredients.first()
    
    def create_ingredient(self, ingredient_name: str, ingredient_amount: float, ingredient_unit: str, commit=False):
        db_ingredient = Ingredient(
            name=ingredient_name,
            amount=ingredient_amount,
            unit=ingredient_unit
        )

        self.db.add(db_ingredient)
        if commit:
            self.db.commit()
            self.db.refresh(db_ingredient)

        return db_ingredient
    
    def create_or_retrieve_ingredient(self, ingredient_name: str, ingredient_amount: float, ingredient_unit: str, commit=False):
        try:
            return self.get_ingredient_by_properties(ingredient_name, ingredient_amount, ingredient_unit)
        except ObjectNotFoundException:
            return self.create_ingredient(
                ingredient_name=ingredient_name,
                ingredient_amount=ingredient_amount,
                ingredient_unit=ingredient_unit,
                commit=commit
            )
        except MultipleInstancesFoundException as e:
            raise e