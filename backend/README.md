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