from fastapi import APIRouter
from app.schemas import ModeloVeiculoSchema
from app.crud import listModeloVeiculo,createModeloVeiculo

router = APIRouter()

@router.get('/modelos_list')
async def list_modeloVeiculo():
    modelosVeiculo = listModeloVeiculo()
    return {'Modelos de Veículos':modelosVeiculo}

@router.post('/criar')
async def create_modelo(modelo: ModeloVeiculoSchema):
    return createModeloVeiculo(
        modelo.nome,
        modelo.montadora_id,
        modelo.valor_referencia,
        modelo.motorizacao,
        modelo.turbo,
        modelo.automatico
    )
