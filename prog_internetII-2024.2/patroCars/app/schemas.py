from pydantic import BaseModel

class MontadoraSchema(BaseModel):
    nome: str
    pais: str
    ano_fundacao: int

class ModeloVeiculoSchema(BaseModel):
    nome: str
    montadora_id: str
    valor_referencia: int
    motorizacao: int
    turbo: bool
    automatico: bool

class VeiculoSchema(BaseModel):
    modelo_id: str
    cor: str
    ano_fabricacao: int
    ano_modelo: int
    valor: int
    placa: str
    vendido: bool