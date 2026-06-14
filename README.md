# RecipeAPI
This API is designed to contain recipes that can be filtered on eg. ingredients and cooking time.

## Running the API
First copy `.env.example` and rename it to `.env`

```bash
mv .env.example .env
```

then edit the variables in .env

```bash
nano .env
```

lastly, build and run the application using docker compose

```bash
docker compose up --build
```

## Development
Clone the repository

```bash
git clone git@github.com:juliansprietsma/recipeAPI.git
```

Use uv to create an environment and activate it

```bash
uv venv
source .venv/bin/activate
```

sync packages

```bash
uv sync
```

Run the application using docker

```bash
docker compose up --build
```

**important**, if you change the models in any way, make sure to fully restore the docker containers (which also cleans out and resets the database)

```bash
docker compose down -v
docker compose up --build
```