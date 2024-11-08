from carregar_relatorio import r
import json

def consultar_redis(nome_relatorio, indice=None, campo=None, valor=None):
    """
    Consulta o Redis por índice ou por um valor específico em um campo.
    
    Args:
        nome_relatorio (str): Nome da aba/relatório.
        indice (int, opcional): Índice para consulta direta.
        campo (str, opcional): Nome do campo para busca específica.
        valor (qualquer tipo, opcional): Valor a buscar no campo especificado.

    Returns:
        dict ou str: Dicionário com o registro ou mensagem de erro.
    """
    # Consulta por índice
    if indice is not None:
        chave = f"{nome_relatorio}:{indice}"
        resultado = r.get(chave)
        if resultado:
            return json.loads(resultado)
        else:
            return "Registro não encontrado pelo índice."

    # Consulta por campo e valor
    elif campo and valor is not None:
        for chave in r.scan_iter(f"{nome_relatorio}:*"):
            registro = json.loads(r.get(chave))
            if registro.get(campo) == valor:
                return registro
        return "Registro não encontrado pelo valor."

    else:
        return "Parâmetros de consulta inválidos. Forneça um índice ou campo e valor."

# Exemplos de consulta
# Consulta pelo índice 0 na aba 'Estado'
resultado_indice = consultar_redis('Estado', indice=0)
print("Resultado da consulta por índice:", resultado_indice)

# Consulta pelo valor 'SP' na coluna 'Estado' na aba 'Estado'
resultado_valor = consultar_redis('Estado', campo='Estado', valor='SP')
print("Resultado da consulta por valor:", resultado_valor)
