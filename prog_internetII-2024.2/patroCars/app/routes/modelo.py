from fastapi import APIRouter,Request,Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from app.schemas import ModeloVeiculoSchema
from app.crud import listModeloVeiculo,createModeloVeiculo,updateModeloVeiculo,deleteModeloVeiculo,listMontadoraModelo,getModeloById

router = APIRouter()
templates = Jinja2Templates(directory='app/templates')

@router.get('/list', response_class=HTMLResponse)
async def list_modeloVeiculo(request:Request):
    modelosVeiculo = listModeloVeiculo()
    return templates.TemplateResponse('modelos_list.html',{'request': request, 'modelos':modelosVeiculo})


@router.post('/create')
async def create_modelo(
    request: Request,
    nome: str = Form(...),
    montadora_id: str = Form(...),
    valor_referencia: int = Form(...),
    motorizacao: int = Form(...),
    turbo: bool = Form(False),
    automatico: bool = Form(False)
):
    createModeloVeiculo(nome, montadora_id, valor_referencia, motorizacao, turbo, automatico)
    return RedirectResponse(url='/modelo/list', status_code=303)

@router.post('/update/{id}')
async def update_modelo(
    id:str,
    nome: str = Form(...),
    montadora_id: str = Form(...),
    valor_referencia: int = Form(...),
    motorizacao: int = Form(...),
    turbo: bool = Form(False),
    automatico: bool = Form(False)):

    modelo = ModeloVeiculoSchema(nome=nome,montadora_id=montadora_id, valor_referencia=valor_referencia,motorizacao=motorizacao,turbo=turbo,automatico=automatico)
    updateModeloVeiculo(id, modelo)
    return RedirectResponse(url='/modelo/list',status_code=303)

#alterar de delete para post pois o endpoint só suporta delete
@router.post('/delete/{id}')
async def delete_modelo(id:str):
    deleteModeloVeiculo(id)
    return RedirectResponse(url='/modelo/list',status_code=303)

#form de modelos
@router.get("/form", response_class=HTMLResponse)
async def form_modelo(request: Request):
    montadoras = listMontadoraModelo()
    return templates.TemplateResponse("modelos_form.html",{"request": request, "montadoras": montadoras})

#form de edicao e exclusao de modelos
@router.get("/form/{id}", response_class=HTMLResponse)
async def form_modelo(request: Request, id: str):
    modelo = getModeloById(id)  # Função que você precisa implementar
    montadoras = listMontadoraModelo()
    return templates.TemplateResponse("modelos_form.html", {"request": request, "modelo": modelo, "montadoras": montadoras})

