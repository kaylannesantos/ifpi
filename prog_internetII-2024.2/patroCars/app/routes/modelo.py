from fastapi import APIRouter
from app.schemas import ModeloVeiculoSchema
from app.crud import listModeloVeiculo,createModeloVeiculo,updateModeloVeiculo,deleteModeloVeiculo

router = APIRouter()

@router.get('/list')
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

@router.put('/update/{id}')
async def update_modelo(id: str, modelo: ModeloVeiculoSchema):
    return updateModeloVeiculo(id, modelo)

@router.delete('/delete/{id}')
async def delete_modelo(id:str):
    return deleteModeloVeiculo(id)
