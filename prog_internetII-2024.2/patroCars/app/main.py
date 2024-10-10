from fastapi import FastAPI
from .routes import montadora, modelo, veiculo

app = FastAPI()

app.include_router(montadora.router)
app.include_router(modelo.router, prefix="/modelo")