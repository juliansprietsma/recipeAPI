from pydantic import BaseModel

class StepBase(BaseModel):

    stepNr: int
    step: str

    class Config:
        from_attributes = True