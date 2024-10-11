from fastapi import FastAPI
from .routes import montadora, modelo, veiculo

app = FastAPI()

app.include_router(montadora.router, prefix="/montadora")
app.include_router(modelo.router, prefix="/modelo")
app.include_router(veiculo.router, prefix='/veiculo')