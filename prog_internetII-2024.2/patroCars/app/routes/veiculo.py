from fastapi import APIRouter,Request,Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from ..schemas import VeiculoSchema
from ..crud import listVeiculo, createVeiculo, updateVeiculo, deleteVeiculo,listModeloVeiculos,getVeiculoById

router = APIRouter()
templates = Jinja2Templates(directory='app/templates')

@router.get('/list', response_class=HTMLResponse)
async def list_veiculo(request:Request):
    veiculos = listVeiculo()
    return templates.TemplateResponse('veiculos_list.html',{'request':request,'veiculos':veiculos})

@router.post('/create')
async def create_veiculo(
    request:Request, 
    modelo_id:str = Form(...), 
    cor: str = Form(...),
    ano_fabricacao: int = Form(...), 
    ano_modelo: int = Form(...),
    valor: int = Form(...),
    placa: str = Form(...), 
    vendido: bool = Form(False)):

    createVeiculo(modelo_id,cor,ano_fabricacao,ano_modelo,valor,placa,vendido)

    return RedirectResponse(url='/veiculo/list', status_code=303)

@router.post('/update/{id}')
async def update_veiculo(
    id: str,
    request: Request,
    modelo_id: str = Form(...),
    cor: str = Form(...),
    ano_fabricacao: int = Form(...),
    ano_modelo: int = Form(...),
    valor: int = Form(...),
    placa: str = Form(...),
    vendido: bool = Form(False)
):
    veiculos = VeiculoSchema(
        modelo_id=modelo_id,
        cor=cor,
        ano_fabricacao=ano_fabricacao,
        ano_modelo=ano_modelo,
        valor=valor,
        placa=placa,
        vendido=vendido
    )
    updateVeiculo(id, veiculos)
    return RedirectResponse(url='/veiculo/list', status_code=303)

@router.post('/delete/{id}')
async def delete_veiculo(id:str):
    deleteVeiculo(id)
    return RedirectResponse(url='/veiculo/list', status_code=303)

#form de veiculos
@router.get("/form", response_class=HTMLResponse)
async def form_veiculo(request: Request):
    modelos = listModeloVeiculos()
    return templates.TemplateResponse("veiculos_form.html",{"request": request, "modelos": modelos})

#form de edicao de montadoras
@router.get("/form/{id}", response_class=HTMLResponse)
async def edit_veiculo(id: str, request: Request):
    veiculo = getVeiculoById(id)
    modelos = listModeloVeiculos()
    return templates.TemplateResponse("veiculos_form.html", {"request": request, "veiculo": veiculo, "modelos":modelos})