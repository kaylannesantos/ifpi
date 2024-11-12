import pandas as pd
import psycopg2
from psycopg2 import sql

# Caminho do arquivo CSV
#file_path = '/mnt/data/focos_incendio.csv'

# Leitura do CSV usando pandas
#df = pd.read_csv(file_path)
df = pd.read_csv('focos_incendio.csv')

# Conexão com o PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="focos_incendio",
    user="postgres",
    password="123"
)
cursor = conn.cursor()

# Estrutura da tabela no PostgreSQL
create_table_query = """
CREATE TABLE IF NOT EXISTS focos_incendio (
    DataHora TIMESTAMP,
    Satelite VARCHAR(50),
    Pais VARCHAR(50),
    Estado VARCHAR(50),
    Municipio VARCHAR(100),
    Bioma VARCHAR(100),
    DiaSemChuva INTEGER,
    Precipitacao REAL,
    RiscoFogo REAL,
    Latitude REAL,
    Longitude REAL,
    FRP REAL
);
"""
cursor.execute(create_table_query)
conn.commit()

# Loop para inserir os dados do DataFrame no PostgreSQL
for _, row in df.iterrows():
    insert_query = """
    INSERT INTO focos_incendio (DataHora, Satelite, Pais, Estado, Municipio, Bioma, DiaSemChuva, Precipitacao, RiscoFogo, Latitude, Longitude, FRP)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """
    
    # Converte o valor de 'DataHora' para o formato de timestamp se necessário
    data = (
        pd.to_datetime(row['DataHora']).strftime('%Y-%m-%d %H:%M:%S'),  # Timestamp
        row['Satelite'],
        row['Pais'],
        row['Estado'],
        row['Municipio'],
        row['Bioma'],
        int(row['DiaSemChuva']),
        float(row['Precipitacao']),
        float(row['RiscoFogo']),
        float(row['Latitude']),
        float(row['Longitude']),
        float(row['FRP'])
    )
    
    cursor.execute(insert_query, data)

# Confirma as inserções
conn.commit()

# Fecha a conexão
cursor.close()
conn.close()

print("Tabela criada e dados inseridos com sucesso no PostgreSQL.")
