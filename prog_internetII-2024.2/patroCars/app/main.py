from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from .routes import montadora, modelo, veiculo

app = FastAPI()

templates = Jinja2Templates(directory='app/templates')

app.include_router(montadora.router, prefix="/montadora")
app.include_router(modelo.router, prefix="/modelo")
app.include_router(veiculo.router, prefix='/veiculo')