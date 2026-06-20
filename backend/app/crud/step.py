from sqlalchemy.orm import Query

from .controller import Controller
from . import ObjectNotFoundException
from ..models.steps import Steps

class StepController(Controller):
    def get_step(self, step_id: int):
        steps: Query = self.db.query(Steps).filter(Steps.id == step_id)

        if steps.count() < 1:
            raise ObjectNotFoundException("This step id does not exist")
        
        return steps.first()


    def get_steps_by_recipe(self, recipe_id: int, stepNr: int):
        steps: Query = self.db.query(Steps).filter(Steps.recipeId == recipe_id)
        
        if steps.count() < 1:
            raise ObjectNotFoundException(f"No steps found for recipe {recipe_id}")

        if stepNr:
            steps = steps.filter(Steps.stepNr == stepNr)

            if steps.count() < 1:
                raise ObjectNotFoundException(f"Step {stepNr} for recipe {recipe_id} does not exist")

        return steps.all()
        
    def create_step(self, stepNr: int, step: str, commit=False):
        db_step = Steps(
            stepNr=stepNr,
            step=step
        )

        self.db.add(db_step)
        if commit:
            self.db.commit()
            self.db.refresh(db_step)
        return db_step
