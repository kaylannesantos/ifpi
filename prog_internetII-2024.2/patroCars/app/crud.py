from fastapi.encoders import jsonable_encoder
from .database import get_db_connection
from .models import Montadora, ModeloVeiculo, Veiculo
from .schemas import MontadoraSchema, ModeloVeiculoSchema, VeiculoSchema

##MONTADORAS
def listMontadora():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM montadora')
    montadoras = cursor.fetchall()

    db.commit()# Salva as mudanças no banco
    cursor.close()# Fecha o cursor
    db.close()# Fecha a conexão com o banco de dados

    return montadoras

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

##MODELO
def listModeloVeiculo():
    db = get_db_connection()
    cursor = db.cursor() 

    cursor.execute(
        '''
        SELECT modelo.id, modelo.nome, montadora.nome AS montadora_nome,modelo.valor_referencia, modelo.motorizacao, modelo.turbo, modelo.automatico 
        FROM modelo 
        JOIN montadora ON montadora.id = modelo.montadora_id
        '''
    )

    resultado = cursor.fetchall()

    modelosVeiculo = []
    for row in resultado:
        modelo = {
            "id": row[0],
            "Nome": row[1],
            "Montadora": row[2],
            "Valor Referencia": row[3],
            "Motorização": row[4],
            "Turbo": row[5],
            "Automático": row[6]           
        } 
        modelosVeiculo.append(modelo)

    cursor.close()
    db.close()

    return jsonable_encoder(modelosVeiculo)

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
            "id": modelo.id,
            "nome": modelo.nome,
            "montadora_id":modelo.montadora_id,
            "valor_referencia": modelo.valor_referencia,
            "motorizacao": modelo.motorizacao,
            "turbo":modelo.turbo,
            "automatico":modelo.automatico
        }
    }

def updateModeloVeiculo(id:str, modelo:ModeloVeiculoSchema):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'UPDATE modelo SET nome = %s, montadora_id = %s, valor_referencia = %s, motorizacao = %s, turbo = %s, automatico = %s WHERE id = %s',
        (modelo.nome, modelo.montadora_id, modelo.valor_referencia, modelo.motorizacao, modelo.turbo, modelo.automatico, id)
    )

    db.commit()
    cursor.close()
    db.close()

    return {
        "message": 'Modelo atualizado com sucesso.',
        'montadora': {
            'id': id,
            'nome': modelo.nome,
            'montadora_id': modelo.montadora_id,
            'valor_referencia': modelo.valor_referencia,
            'motorizacao': modelo.motorizacao,
            'turbo': modelo.turbo,
            'automatico': modelo.automatico
        }
    }

def deleteModeloVeiculo(id:str):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'DELETE FROM modelo WHERE id = %s',
        (id,)
    )

    db.commit()
    cursor.close()
    db.close()

    return {'message': 'Modelo deletado com sucesso.'}

##VEÍCULOS
def listVeiculo():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM veiculo')
    veiculos = cursor.fetchall()

    db.commit()# Salva as mudanças no banco
    cursor.close()# Fecha o cursor
    db.close()# Fecha a conexão com o banco de dados

    return veiculos

def createVeiculo(modelo_id: str,cor: str,ano_fabricacao: int,ano_modelo: int,valor: int,placa: str,vendido: bool):
    veiculo = Veiculo(modelo_id, cor, ano_fabricacao, ano_modelo, valor, placa, vendido)

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'INSERT INTO veiculo(id, modelo_id, cor, ano_fabricacao, ano_modelo, valor, placa, vendido) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)',
        (
            veiculo.id,
            veiculo.modelo_id, 
            veiculo.cor, 
            veiculo.ano_fabricacao, 
            veiculo.ano_modelo, 
            veiculo.valor, 
            veiculo.placa, 
            veiculo.vendido
        )
    )

    db.commit()
    cursor.close()
    db.close()

    return {
        "message": "Veículo criado com sucesso.",
        "veiculo": {
            "id": veiculo.id,
            "modelo_id": veiculo.modelo_id,
            "cor": veiculo.cor,
            "ano_fabricacao": veiculo.ano_fabricacao,
            "ano_modelo": veiculo.ano_modelo,
            "valor": veiculo.valor,
            "placa": veiculo.placa,
            "vendido": veiculo.vendido
        }
    }

def updateVeiculo(id:str, veiculo:VeiculoSchema):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'UPDATE veiculo SET modelo_id = %s, cor = %s, ano_fabricacao = %s, ano_modelo = %s, valor = %s, placa = %s, vendido = %s WHERE id = %s',
        (
            veiculo.modelo_id, 
            veiculo.cor, 
            veiculo.ano_fabricacao, 
            veiculo.ano_modelo, 
            veiculo.valor, 
            veiculo.placa, 
            veiculo.vendido,
            id
        )
    )

    db.commit()
    cursor.close()
    db.close()

    return {
        "message": "Veículo atualizado com sucesso.",
        "veiculo": {
            "id": id,
            "modelo_id": veiculo.modelo_id,
            "cor": veiculo.cor,
            "ano_fabricacao": veiculo.ano_fabricacao,
            "ano_modelo": veiculo.ano_modelo,
            "valor": veiculo.valor,
            "placa": veiculo.placa,
            "vendido": veiculo.vendido
        }
    }

def deleteVeiculo(id:str):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        'DELETE FROM veiculo WHERE id = %s',
        (id,)
    )

    db.commit()
    cursor.close()
    db.close()

    return{'message': 'Veículo deletado com sucesso.'}