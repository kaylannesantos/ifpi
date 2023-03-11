import requests
from bs4 import BeautifulSoup

# Faz a solicitação HTTP para a página
url = 'https://www.google.com'
response = requests.get(url)

# Analisa o HTML usando a biblioteca BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Encontra todas as tags <a> na página e extrai o atributo href
links = []
for link in soup.find_all('a'):
    href = link.get('href')
    if href is not None:
        links.append(href)

# Exibe os links encontrados
for link in links:
    print(link)
