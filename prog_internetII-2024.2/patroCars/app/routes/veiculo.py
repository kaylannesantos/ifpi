from fastapi import APIRouter
from ..schemas import VeiculoSchema
from ..crud import listVeiculo, createVeiculo, updateVeiculo, deleteVeiculo

router = APIRouter()

@router.get('/list')
async def list_veiculo():
    veiculos = listVeiculo()
    return {'montadoras':veiculos}

@router.post('/create')
async def create_veiculo(veiculo:VeiculoSchema):
    return createVeiculo( 
            veiculo.modelo_id,
            veiculo.cor, 
            veiculo.ano_fabricacao, 
            veiculo.ano_modelo, 
            veiculo.valor, 
            veiculo.placa, 
            veiculo.vendido
    )

@router.put('/update/{id}')
async def update_veiculo(id:str, veiculo:VeiculoSchema):
    return updateVeiculo(id, veiculo)

@router.delete('/delete/{id}')
async def delete_veiculo(id:str):
    return deleteVeiculo(id)