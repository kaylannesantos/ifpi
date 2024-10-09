from fastapi import APIRouter
from ..crud import createMontadora
from ..schemas import MontadoraSchema, ModeloVeiculoSchema, VeiculoSchema

router = APIRouter()

@router.post("/montadoras")
async def create_montadora(montadora:MontadoraSchema):
    ##newId = await createMontadora(montadora)
    return createMontadora(montadora.nome, montadora.pais, montadora.ano_fundacao)