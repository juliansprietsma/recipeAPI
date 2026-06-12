from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def second_example():
    return {"message": "test"}
