FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the application into the container.
COPY . /backend

# Install the application dependencies.
WORKDIR /backend
RUN uv sync --frozen --no-cache

EXPOSE 8000

# Run the application.
CMD ["/backend/.venv/bin/fastapi", "run", "app/main.py"]