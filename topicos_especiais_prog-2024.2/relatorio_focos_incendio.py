import pandas as pd
import redis
import json

# Conexão com o Redis (ajuste a configuração se necessário)
r = redis.Redis(host='localhost', port=6379, db=0)

# Função para salvar os dados no Redis
def salvar_no_redis(nome_relatorio, dataframe):
    # Verifica se é uma Series ou DataFrame
    if isinstance(dataframe, pd.Series):
        # Para Series, usa items() para iterar sobre os valores e índices
        for idx, valor in dataframe.items():
            chave = f"{nome_relatorio}:{idx}"  # Chave única para cada valor
            # Cria um dicionário com a chave sendo o índice e o valor sendo o valor da Series
            r.set(chave, json.dumps({nome_relatorio: valor}))
    else:
        # Para DataFrame, usa iterrows()
        for idx, row in dataframe.iterrows():
            chave = f"{nome_relatorio}:{idx}"  # Chave única para cada linha
            r.set(chave, json.dumps(row.to_dict()))  # Converte a linha em JSON e armazena no Redis

# Carrega os dados de incêndio a partir de um arquivo CSV
df = pd.read_csv('focos_incendio.csv')

# Converte a coluna 'DataHora' para o tipo datetime
df['DataHora'] = pd.to_datetime(df['DataHora'], format='%Y/%m/%d %H:%M:%S')

# Relatórios de focos de incêndio por estado, município, etc.
focos_por_estado = df['Estado'].value_counts()
focos_por_municipio = df['Municipio'].value_counts()
risco_fogo_medio = df.groupby('Estado')['RiscoFogo'].mean()
precipitacao_media_bioma = df.groupby('Bioma')['Precipitacao'].mean()
frp_medio_estado = df.groupby('Estado')['FRP'].mean()
focos_por_mes = df.groupby(df['DataHora'].dt.to_period('M')).size()

# Salva os dados no Redis, cada um com nome de relatório
salvar_no_redis('Estado', focos_por_estado)
salvar_no_redis('Municipio', focos_por_municipio)
salvar_no_redis('RiscoFogo', risco_fogo_medio)
salvar_no_redis('Precipitacao', precipitacao_media_bioma)
salvar_no_redis('FRP', frp_medio_estado)
salvar_no_redis('FocosPorMes', focos_por_mes)

print("Relatório salvo no Redis.")