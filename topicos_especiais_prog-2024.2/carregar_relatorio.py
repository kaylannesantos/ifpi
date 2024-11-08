import pandas as pd
import redis
import json

# Conexão com o Redis (ajuste a configuração se necessário)
r = redis.Redis(host='localhost', port=6379, db=0)

# Carrega o relatório gerado pelo pandas
df = pd.read_excel('relatorio_focos_incendio.xlsx', sheet_name=None)

# Função para salvar cada DataFrame no Redis
def salvar_no_redis(nome_relatorio, dataframe):
    # Converte tipos incompatíveis antes de salvar
    dataframe = dataframe.applymap(lambda x: x.isoformat() if isinstance(x, pd.Timestamp) else x)

    # Converte cada linha em JSON para salvar no Redis
    for index, row in dataframe.iterrows():
        # Define a chave usando o nome do relatório e o índice
        chave = f"{nome_relatorio}:{index}"
        # Converte a linha em um dicionário e depois para JSON
        r.set(chave, json.dumps(row.to_dict()))

# Salva cada aba do Excel em Redis
for nome, dataframe in df.items():
    salvar_no_redis(nome, dataframe)

print("Relatório salvo no Redis.")
