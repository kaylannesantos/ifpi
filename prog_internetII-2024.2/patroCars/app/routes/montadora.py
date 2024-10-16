from fastapi import APIRouter,Request,Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from ..schemas import MontadoraSchema
from ..crud import createMontadora, listMontadora, deleteMontadora,updateMontadora,getMontadoraById

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
    
#alterar de delete para post pois o endpoint só suporta delete
@router.post('/update/{id}')
async def update_montadora(id: str, nome: str = Form(...), pais: str = Form(...), ano_fundacao: int = Form(...)):
    montadora = MontadoraSchema(nome=nome, pais=pais, ano_fundacao=ano_fundacao)
    updateMontadora(id, montadora)
    return RedirectResponse(url='/montadora/list', status_code=303)

#alterar de delete para post pois o endpoint só suporta delete
@router.post('/delete/{id}')
async def delete_montadora(id: str):
    deleteMontadora(id)
    return RedirectResponse(url='/montadora/list', status_code=303)

#form de montadoras
@router.get("/form", response_class=HTMLResponse)
async def form_montadora(request: Request):
    return templates.TemplateResponse("montadoras_form.html", {"request": request})

#form de edicao de montadoras
@router.get("/form/{id}", response_class=HTMLResponse)
async def edit_montadora(id: str, request: Request):
    montadora = getMontadoraById(id)
    return templates.TemplateResponse("montadoras_form.html", {"request": request, "montadora": montadora})
