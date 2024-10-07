from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from typing import List

app = FastAPI()

app.mount("/static",StaticFiles(directory="static"),name="static")

templates = Jinja2Templates(directory='templates')

books: List[dict] = []

@app.get('/')
async def read_root(request: Request):
    return templates.TemplateResponse('index.html', {"request": request, "books": books})

@app.get('/add')
async def add_book(request: Request):
    return templates.TemplateResponse("add_livro.html", {"request": request, })

@app.post('/add')
async def criar_livro(request: Request, nome: str, autor: str, dataInicial: str = Form(...), dataFinal: str = Form(...)):
    books.append({"nome": nome, "autor": autor, "dataInicial": dataInicial, "dataFinal": dataFinal})
    return templates.TemplateResponse("index.html", {"request": request, "books": books})




