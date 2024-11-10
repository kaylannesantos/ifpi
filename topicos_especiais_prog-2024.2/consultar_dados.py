import redis
import json

# Conexão com o Redis (ajuste a configuração se necessário)
r = redis.Redis(host='localhost', port=6379, db=0)

# Função para consultar dados no Redis
def consultar_redis(nome_relatorio, indice):
    chave = f"{nome_relatorio}:{indice}"  # A chave única para o relatório e índice
    resultado = r.get(chave)  # Recupera o valor do Redis usando a chave
    
    # Se o resultado existe, converte de volta para um dicionário
    if resultado:
        return json.loads(resultado)
    else:
        return "Registro não encontrado."

# Exemplo de consulta para um valor específico
resultado_estado_0 = consultar_redis('Estado', 6)  # Consulta o primeiro registro da aba 'Estado'
print("Resultado da consulta para o estado 0:", resultado_estado_0)

# Exemplo de consulta para o foco de incêndio em determinado mês
resultado_mes_2023_01 = consultar_redis('FocosPorMes', '2024-06')  # Consulta focos por mês para Janeiro de 2023
print("Resultado da consulta para Janeiro de 2023:", resultado_mes_2023_01)