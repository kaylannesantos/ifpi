import requests
from bs4 import BeautifulSoup

# Lê a URL da página do usuário
url = input("Digite a URL da página: ")

# Faz a solicitação HTTP para a página
response = requests.get(url)

# Analisa o HTML usando a biblioteca BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Lê o nome da tag do usuário
tag_name = input("Digite o nome da tag: ")

# Encontra a tag desejada e exibe seu conteúdo
tag = soup.find(tag_name)
if tag is not None:
    print(tag.text)
else:
    print("A tag {} não foi encontrada na página.".format(tag_name))
