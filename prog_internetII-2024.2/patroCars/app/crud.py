from .db import get_db_connection
from .models import Montadora, ModeloVeiculo, Veiculo

##montadora
def createMontadora(nome: str, pais: str, ano_fundacao: int):
    montadora = Montadora(nome, pais, ano_fundacao)
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO montadora (id, nome, pais, ano_fundacao) VALUES(%s,%s,%s,%s)',
        (montadora.id, montadora.nome, montadora.pais, montadora.ano_fundacao)
    )
    db.commit()
    cursor.close()
    db.close()
    return {"id": montadora.id, "nome": montadora.nome, "pais": montadora.pais, "ano_fundacao": montadora.ano_fundacao}

##modelo 

##veiculo
