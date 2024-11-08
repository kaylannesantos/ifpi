import pandas as pd

# Carrega os dados de incêndio a partir de um arquivo CSV
df = pd.read_csv('focos_incendio.csv')

# Converte a coluna 'DataHora' para o tipo datetime
df['DataHora'] = pd.to_datetime(df['DataHora'], format='%Y/%m/%d %H:%M:%S')

# Amostra dos dados
print("Amostra dos dados:")
print(df.head())

# Relatório de focos de incêndio por estado
focos_por_estado = df['Estado'].value_counts()
print("\nFocos de incêndio por estado:")
print(focos_por_estado)

# Relatório de focos de incêndio por município
focos_por_municipio = df['Municipio'].value_counts()
print("\nFocos de incêndio por município:")
print(focos_por_municipio)

# Média de RiscoFogo por estado
risco_fogo_medio = df.groupby('Estado')['RiscoFogo'].mean()
print("\nMédia de risco de fogo por estado:")
print(risco_fogo_medio)

# Média de Precipitação por bioma
precipitacao_media_bioma = df.groupby('Bioma')['Precipitacao'].mean()
print("\nMédia de precipitação por bioma:")
print(precipitacao_media_bioma)

# Média de FRP (Fire Radiative Power) por estado
frp_medio_estado = df.groupby('Estado')['FRP'].mean()
print("\nMédia de FRP por estado:")
print(frp_medio_estado)

# Focos de incêndio por mês
focos_por_mes = df.groupby(df['DataHora'].dt.to_period('M')).size()
print("\nFocos de incêndio por mês:")
print(focos_por_mes)

# Exporta o relatório para um arquivo Excel
with pd.ExcelWriter('relatorio_focos_incendio.xlsx') as writer:
    focos_por_estado.to_frame(name='Focos por Estado').to_excel(writer, sheet_name='Estado')
    focos_por_municipio.to_frame(name='Focos por Município').to_excel(writer, sheet_name='Município')
    risco_fogo_medio.to_frame(name='Risco Médio de Fogo').to_excel(writer, sheet_name='Risco de Fogo')
    precipitacao_media_bioma.to_frame(name='Precipitação Média por Bioma').to_excel(writer, sheet_name='Precipitação Bioma')
    frp_medio_estado.to_frame(name='FRP Médio por Estado').to_excel(writer, sheet_name='FRP Estado')
    focos_por_mes.to_frame(name='Focos por Mês').to_excel(writer, sheet_name='Focos por Mês')

print("Relatório gerado e exportado para 'relatorio_focos_incendio.xlsx'")
