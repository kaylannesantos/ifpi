from fastapi import APIRouter
from ..schemas import MontadoraSchema
from ..crud import createMontadora, listMontadora, deleteMontadora,updateMontadora

router = APIRouter()

@router.get('/list')
async def list_montadora():
    montadoras = listMontadora()
    return {'montadoras':montadoras}

@router.post("/create")
async def create_montadora(montadora:MontadoraSchema):
    return createMontadora(montadora.nome, montadora.pais, montadora.ano_fundacao)

@router.put('/update/{id}')
async def update_montadora(id: str, montadora:MontadoraSchema):
    return updateMontadora(id, montadora)

@router.delete('/delete/{id}')
async def delete_montadora(id: str):
    return deleteMontadora(id)