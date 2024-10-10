from .database import get_db_connection
from .models import Montadora, ModeloVeiculo, Veiculo
from .schemas import MontadoraSchema

##MONTADORAS
##list
def listMontadora():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM montadora')
    montadoras = cursor.fetchall()

    db.commit()# Salva as mudanças no banco
    cursor.close()# Fecha o cursor
    db.close()# Fecha a conexão com o banco de dados

    return montadoras

##create
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

    return {
        "message": "Montadora criada com sucesso.",
        "montadora": {
            "id": id,
            "nome": montadora.nome,
            "pais": montadora.pais,
            "ano_fundacao": montadora.ano_fundacao
        }
    }

##update
def updateMontadora(id:str, montadora: MontadoraSchema):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'UPDATE montadora SET nome = %s, pais = %s, ano_fundacao = %s WHERE id = %s',
        (montadora.nome, montadora.pais, montadora.ano_fundacao, id)
    )

    db.commit()
    cursor.close()
    db.close()    

    return {
        "message": "Montadora atualizada com sucesso.",
        "montadora": {
            "id": id,
            "nome": montadora.nome,
            "pais": montadora.pais,
            "ano_fundacao": montadora.ano_fundacao
        }
    }

##delete
def deleteMontadora(id:str):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'DELETE FROM montadora WHERE id = %s',
        (id,)
    )

    db.commit()
    cursor.close()
    db.close()

    return {'message': f'Montadora deletada com sucesso.'}

##MODELOS
##list
def listModeloVeiculo():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM modelo')
    modelosVeiculo = cursor.fetchall()

    db.commit()
    cursor.close()
    db.close()

    return modelosVeiculo

##create
def createModeloVeiculo(nome: str ,montadora_id: str, valor_referencia: int, motorizacao: int, turbo: bool, automatico: bool):
    modelo = ModeloVeiculo(nome, montadora_id, valor_referencia, motorizacao, turbo, automatico)

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'INSERT INTO modelo(id, nome, montadora_id, valor_referencia, motorizacao, turbo, automatico) VALUES(%s,%s,%s,%s,%s,%s,%s)',
        (
            modelo.id,
            modelo.nome,
            modelo.montadora_id,
            modelo.valor_referencia,
            modelo.motorizacao,
            modelo.turbo,
            modelo.automatico
        )
    )
    db.commit()
    cursor.close()
    db.close()

    return {
        "message": "Montadora criada com sucesso.",
        "montadora": {
            "id": id,
            "nome": modelo.nome,
            "montadora_id":modelo.montadora_id,
            "valor_referencia": modelo.valor_referencia,
            "motorizacao": modelo.motorizacao,
            "turbo":modelo.turbo,
            "automatico":modelo.automatico
        }
    }

##VEÍCULOS