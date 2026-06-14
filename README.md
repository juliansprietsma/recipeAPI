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

Use uv to create an environment

```bash
uv venv
```

sync packages

```bash
uv sync
```