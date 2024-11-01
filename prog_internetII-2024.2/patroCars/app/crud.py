from fastapi.encoders import jsonable_encoder
from .database import get_db_connection
from .models import Montadora, ModeloVeiculo, Veiculo
from .schemas import MontadoraSchema, ModeloVeiculoSchema, VeiculoSchema

##MONTADORAS
def getMontadoraById(id: str):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM montadora WHERE id = %s', (id,))
    row = cursor.fetchone()

    if row:
        montadora = {
            'id': row[0],
            'nome': row[1],
            'pais': row[2],
            'ano_fundacao': row[3]
        }
    else:
        montadora = None

    cursor.close()
    db.close()

    return montadora

def listMontadora():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM montadora')
    rows = cursor.fetchall()

    montadoras = []
    for row in rows:
        montadoras.append({
            'id':row[0],
            'nome':row[1],
            'pais':row[2],
            'ano_fundacao':row[3]
        })

    cursor.close()
    db.close()

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
def getModeloById(id: str):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM modelo WHERE id = %s', (id,))
    row = cursor.fetchone()

    cursor.close()
    db.close()

    if row:
        return {
            "id": row[0],
            "nome": row[1],
            "montadora_id": row[2],
            "valor_referencia": row[3],
            "motorizacao": row[4],
            "turbo": row[5],
            "automatico": row[6]
        }
    return None

def listModeloVeiculo():
    db = get_db_connection()
    cursor = db.cursor()
    
    # Executa um JOIN com a tabela montadora para obter o nome da montadora
    cursor.execute('''
        SELECT m.id, m.nome, mo.nome AS montadora,m.valor_referencia, m.motorizacao, m.turbo, m.automatico
        FROM modelo m
        JOIN montadora mo ON m.montadora_id = mo.id
    ''')
    
    rows = cursor.fetchall()
    
    modelosVeiculo = []
    for row in rows:
        modelosVeiculo.append({
            "id": row[0],
            "nome": row[1],
            "montadora": row[2],  # Nome da montadora
            "valor_referencia": row[3],
            "motorizacao": row[4],
            "turbo": row[5],
            "automatico": row[6]
        })
    
    cursor.close()
    db.close()
    
    return modelosVeiculo

def createModeloVeiculo(nome: str, montadora_id: str, valor_referencia: int, motorizacao: int, turbo: bool, automatico: bool):
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
        "message": "Modelo criado com sucesso.",
        "modelo": {
            "id": modelo.id,
            "nome": modelo.nome,
            "montadora_id": modelo.montadora_id,
            "valor_referencia": modelo.valor_referencia,
            "motorizacao": modelo.motorizacao,
            "turbo": modelo.turbo,
            "automatico": modelo.automatico
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

def listMontadoraModelo():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT id, nome FROM montadora')
    montadoras = cursor.fetchall()
    
    lista_montadoras = [{"id": montadora[0], "nome": montadora[1]} for montadora in montadoras]

    cursor.close()
    db.close()
    
    return lista_montadoras

##VEÍCULOS]
def getVeiculoById(id: str):
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM veiculo WHERE id = %s', (id,))
    row = cursor.fetchone()

    cursor.close()
    db.close()

    if row:
        return {
            "id": row[0],
            "modelo_id": row[1],
            "cor": row[2],
            "ano_fabricacao": row[3],
            "ano_modelo": row[4],
            "valor": row[5],
            "placa": row[6],
            "vendido": row[7]
        }
    return None

def listVeiculo():
    db = get_db_connection()
    cursor = db.cursor()
    
    cursor.execute('''
        SELECT v.id, m.nome AS modelo, v.cor, v.ano_fabricacao, v.ano_modelo, v.valor, v.placa, v.vendido
        FROM veiculo v
        JOIN modelo m ON v.modelo_id = m.id
    ''')
    
    rows = cursor.fetchall()
    
    veiculos = []
    for row in rows:
        veiculos.append({
            "id": row[0],
            "modelo": row[1],
            "cor": row[2],
            "ano_fabricacao": row[3],
            "ano_modelo": row[4],
            "valor": row[5],
            "placa": row[6],
            "vendido": row[7]
        })
        
    cursor.close()
    db.close()
    
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

def listModeloVeiculos():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute('SELECT id, nome FROM modelo')
    modelos = cursor.fetchall()
    
    lista_modelos = [{"id": modelo[0], "nome": modelo[1]} for modelo in modelos]

    cursor.close()
    db.close()
    
    return lista_modelos