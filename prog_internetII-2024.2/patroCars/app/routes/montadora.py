from fastapi import APIRouter,Request,Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from ..schemas import MontadoraSchema
from ..crud import createMontadora, listMontadora, deleteMontadora,updateMontadora

router = APIRouter()
templates = Jinja2Templates(directory='app/templates')

@router.get('/list', response_class=HTMLResponse)
async def list_montadora(request:Request):
    montadoras = listMontadora()
    return templates.TemplateResponse('montadoras_list.html', {'request':request,'montadoras': montadoras})

@router.post("/create")
async def create_montadora(request: Request,nome: str = Form(...),pais: str = Form(...),ano_fundacao: str = Form(...)):
    createMontadora(nome,pais,ano_fundacao)
    return RedirectResponse(url='/montadora/list', status_code=303)

#form de montadoras
@router.get("/form", response_class=HTMLResponse)
async def form_montadora(request: Request):
    return templates.TemplateResponse("montadoras_form.html", {"request": request})

@router.put('/update/{id}')
async def update_montadora(id: str, montadora:MontadoraSchema):
    return updateMontadora(id, montadora)

@router.delete('/delete/{id}')
async def delete_montadora(id: str):
    return deleteMontadora(id)