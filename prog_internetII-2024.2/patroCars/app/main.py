from fastapi import FastAPI
from .routes import montadora

app = FastAPI()

app.include_router(montadora.router)