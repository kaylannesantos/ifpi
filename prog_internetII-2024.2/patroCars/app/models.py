from ulid import ULID

class Montadora:
    def __init__(self, nome: str, pais: str, ano_fundacao: int):
        self.id = str(ULID())
        self.nome = nome
        self.pais = pais
        self.ano_fundacao = ano_fundacao

class ModeloVeiculo: 
    def __init__(self, nome: str ,montadora_id: str, valor_referencia: int, motorizacao: int, turbo: bool, automatico: bool):
        self.id = str(ULID())
        self.nome = nome
        self.montadora_id = montadora_id
        self.valor_referencia = valor_referencia
        self.motorizacao = motorizacao
        self.turbo = turbo
        self.automatico = automatico

class Veiculo:
    def __init__(self, modelo_id: str, cor: str, ano_fabricacao: int, ano_modelo: int, valor: int, placa: str, vendido: bool):
        self.id = str(ULID())
        self.modelo_id = modelo_id
        self.cor = cor
        self.ano_fabricacao = ano_fabricacao
        self.ano_modelo = ano_modelo
        self.valor = valor
        self.placa = placa
        self.vendido = False