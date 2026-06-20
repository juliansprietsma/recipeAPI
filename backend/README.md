# Backend
This project contains a [FastAPI](https://fastapi.tiangolo.com/) backend. The folder structure is as follows:

    - /backend
        - /app
            - /crud              # CRUD operations
            - /models            # Models as they are in the Database
            - /routers           # Routers that handle endpoint landing and status codes
            - /schemas           # Class representation of models
            - database.py        # Database connection
            - main.py            # Application root
        - Dockerfile  
        - pyproject.toml
        - README.md
        - uv.lock

To see the OpenAPI documentation, start the application using docker and then go to:

    localhost:{BACKEND_PORT}/docs

Where {BACKEND_PORT} is the port you set in the .env file

## Endpoints
Underneath you can find a curated list of endpoints, their parameters, their status codes, etc.

### /recipes GET

> Parameters:
>
>
> name: str
> cookTime: str ("hh:mm:ss")
> ingredients: List[str]

response codes:
- 200: Success

### /recipes POST

> recipe: RecipeCreate

response codes:
- 201: Succesful creation
- 404: Not found
- 400: Bad request
- 500: Internal Server Error

### /recipes/{id} GET

> id: int

response codes:
- 200: Success
- 404: Not found