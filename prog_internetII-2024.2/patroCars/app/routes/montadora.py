from fastapi import APIRouter
from ..crud import createMontadora, listMontadora, deleteMontadora,updateMontadora
from ..schemas import MontadoraSchema

router = APIRouter()

@router.get('/montadoras_list')
async def list_montadora():
    montadoras = listMontadora()
    return {'montadoras':montadoras}

@router.post("/montadoras_create")
async def create_montadora(montadora:MontadoraSchema):
    return createMontadora(montadora.nome, montadora.pais, montadora.ano_fundacao)

@router.put('/montadoras_update/{id}')
async def update_montadora(id: str, montadora:MontadoraSchema):
    return updateMontadora(id, montadora)


@router.delete('/montadoras_delete/{id}')
async def delete_montadora(id: str):
    return deleteMontadora(id)