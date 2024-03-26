import os
from bs4 import BeautifulSoup #biblioteca para analizar documentos html e xml
from datetime import datetime #usado para trabalhar com datas
import pandas as pd
import json


class Buscador:
    def __init__(self): #é chamado quando o objeto da classe é criado
        self.visited_links = set()  
        self.link_to_page = {} #mapeia os links para as páginas que aparecerem
        self.storage_links = [] #lista para armazenar os links
        self.scores = self.load_scores_from_json('pontuacoes.json') #inicializa os scores no arquivo JSON carregango as pontuações

    def load_scores_from_json(self, file_path): #metodo para carregar as pontuações a partir do arquivo JSON
        try:
            with open(file_path, 'r') as f:
                return json.load(f) #carrega e retorna os dados
        except Exception as e:
            print(f"Erro ao carregar pontuações do arquivo JSON: {e}")
            return {}

    #!busca links em uma página html 
    def search_links(self, content, page): #?content= conteudo da página html, page= pagina atual ao qual os pontos serao calculados 
        pontos = 0 #? variavel que vai armazenar o valor total da pontuação

        links = BeautifulSoup(content, 'html.parser').find_all('a') #?usa o beautifulSoup para encontrar todos os elementos da tag <a> 

        for link in links: #?1° carrega os links visitados,
            href = link.get('href') #?depois obtém o atributo 'href' do link,
            if href: #? verifica se o atributo 'href' tem URL
                if href not in self.visited_links: #? verifica se o link ja foi visitado.
                    self.visited_links.add(href) #?2° adiciona o link aos links visitados
                    self.armazenar_links(href) #?3° faz o armazenamento desses links usando o metodo armazenar_links
                if href == page:#?verifica se o link é igual ao da página atual
                    pontos += self.scores.get('autoridade') #?se o link encontrado for o da página atual, ele adiciona pontos de acordo com a autoridade definida no dicionario de pontuações 
                self.link_to_page[href] = self.link_to_page.get(href, []) + [page] #? mapeia o link para a página atual no dicionario 'link_to_page'

    def calcular_pontos_para_pagina(self, page): #calcula os pontos das páginas de acordo com os links que apontam pra ela
        pontos = 0
        for linked_page in self.link_to_page.get(page, []): #1° carrega as páginas vinculadas a página atual e adiciona pontos de acordo com a  autoridade definida
            pontos += self.scores.get('autoridade') #incrementa os pontos das páginas
        return pontos #retorna a quantidade atual de pontos

    #!metodo para calcular pontos para termos específicos em uma página.
    def calcular_pontos_termos(self, content, termo): #?content = conteudo da página hmtl, termo = termo buscado na página
        pontos = 0 #?variavel que irá armazenar o valor total para o termo

        #*utiliza o try para tratamento de erro
        try:
            soup = BeautifulSoup(content, 'html.parser') #?usa o beautifulsoup para encontrar todos os textos na página

            # Encontra todo o conteúdo de texto dentro do HTML, incluindo o texto das tags <title> e <meta>, mas excluindo as ocorrências dentro das tags <script>, <style> e <a>
            #?essa linha encontra todo o texto do html, incluindo os das tags <title> e <meta>, com exceção das tags <scrpipt> <style> <a>
            textos = [texto for texto in soup.find_all(string=True, recursive=True) if not (texto.parent.name == '<a>' or (texto.parent.name == '<a>' and texto.parent.get_text(strip=True) == texto))] 
            #?adiciona o texto das tags <meta> ao conteudo
            textos += [texto['content'] for texto in soup.find_all('meta', content=True)] # Adiciona o texto das tags <meta> ao conteúdo
            #?adiciona o texto das tags <title> ao conteudo
            textos += [texto['content'] for texto in soup.find_all('title', content=True)] # Adiciona o texto das tags <meta> ao conteúdo

            # Verifica se o termo está presente nos textos e conta as ocorrências
            ocorrencias = sum(texto.lower().count(termo.lower()) for texto in textos)#?conta o n° de ocorrencias dos termos
            # Multiplica o número de ocorrências pelo valor definido para os termos e adiciona ao total de pontos
            pontos += ocorrencias * self.scores.get('termos')#? multiplica o n° de ocorrencias pelo valor definido(20 pt cada tag) no dicionario de pontuações
        except Exception as e:
            print(f"Erro ao calcular pontos pelos termos: {e}")

        return pontos #?retorna o total de pontos do termo na página

    def buscar_ocorrencias_title(self, soup, termo):#define um metodo para buscar as ocorrencias de um termo na página
        pontos = 0
        tags_scores = self.scores['tags']
        title_tags = soup.find_all('title') #1° usa o beautifulsoup para encontrar todos os termos da tag <title>
        if title_tags:#2° verifica se o termo esta presente no texto do titulo
            for tag in title_tags:
                if termo.lower() in tag.get_text().lower():#3° se estiver presente, 
                    pontos += tags_scores.get('title', 0) #4° adiciona os pontos corrrespondentes ao titulo definido no dicionario de pontuações
        return pontos #5° e retorno os pontos

    def buscar_ocorrencias_meta(self, soup, termo):#metodo para buscar ocorrencias dos termos dentro da tag <meta>
        pontos = 0
        tags_scores = self.scores['tags']
        meta_tags = soup.find_all('meta')#1° usa o beautifulsoup para encontrar todas as tags <meta> 
        if meta_tags:
            for tag in meta_tags:
                if termo.lower() in tag.get('content', '').lower() or termo.lower() in tag.get('name', '').lower(): #2° se o termo estiver presente no atributo content ou name
                    pontos += tags_scores.get('meta', 0) #3° se estiver presente, adiciona os pontos correspondentes as pontuações
        return pontos #4° por fim retorna os pontos

    def buscar_ocorrencias_tag(self, soup, tag_name, termo):#metodo para buscar ocorrencias de um termo dentro das tags <h1> <h2> <p> <a>
        pontos = 0
        tags_scores = self.scores.get('tags', {})
        tag_score = tags_scores.get(tag_name, 0)

        tags = soup.find_all(tag_name) #usa o beautifulsoup para encontrar todos os elementos a partir das tags especificadas 
        if tags:
            for tag in tags:
                ocorrencias = tag.get_text().lower().count(termo.lower()) #conta as ocorrencias do termo,
                pontos += ocorrencias * tag_score #multiplica o n° de ocorrencias pelo valor definido para a tag a partir das pontuações

        return pontos #retorna os pontos

    def calcular_pontos_tags(self, content, termo):#metodo para calcular pontos de termos especificos dentro das tags
        pontos = 0

        try:
            soup = BeautifulSoup(content, 'html.parser') #usa o beautifulsoup para analisar o conteudo da página html

            if 'tags' in self.scores: #verifica se existem pontuações definidas para as tags dentro do dicionario de pontuações, se existir, chama os metodos correspondentes as tags e adiciona os pontos
                # Busca ocorrências em cada tipo de tag e adiciona os pontos correspondentes
                pontos += self.buscar_ocorrencias_title(soup, termo)
                pontos += self.buscar_ocorrencias_meta(soup, termo)
                pontos += self.buscar_ocorrencias_tag(soup, 'h1', termo)
                pontos += self.buscar_ocorrencias_tag(soup, 'h2', termo)
                pontos += self.buscar_ocorrencias_tag(soup, 'p', termo)
                pontos += self.buscar_ocorrencias_tag(soup, 'a', termo)
            else:
                print("As pontuações para as tags não foram encontradas no arquivo JSON.")

        except Exception as e:
            print(f"Erro ao calcular pontos pelas tags: {e}")

        return pontos #retorna os pontos

    def calcular_pontos_autoreferencia(self, page, content):#metodo para calcular pontos para autoreferencia em uma pagina
        pontos = 0

        try:
            soup = BeautifulSoup(content, 'html.parser') #usa o beautifulsoup para analisar todos os links das tags <a> na página que aponta para a propria página
            links = soup.find_all('a', href=lambda href: href == page)

            if links:
                pontos = self.scores.get('autoreferencia') #se houver links encontrados para autoreferencia, retorna os pontos de acordo com o dicionario de pontuações
        except Exception as e:
            print(f"Erro ao calcular pontos de autoreferência: {e}")

        return pontos

    def calcular_pontos_frescor(self, conteudo):
        try:
            soup = BeautifulSoup(conteudo, 'html.parser')
            data_publicacao = soup.find('p', string=lambda text: 'Data da Publicação:' in text or 'Data de postagem:' in text)

            if data_publicacao:
                data_publicacao_texto = data_publicacao.get_text(strip=True)
                ano_publicacao = int(data_publicacao_texto.split('/')[-1])
                ano_atual = datetime.now().year

                diferenca_anos = ano_atual - ano_publicacao

                if diferenca_anos == 0:
                    return 30
                else:
                    return -5 * diferenca_anos
            else:
                return 0

        except Exception as e:
            print(f"Erro ao calcular pontos de frescor do conteúdo: {e}")
            return 0

    def load_content_from_local_file(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"Erro ao carregar conteúdo do arquivo local: {e}")
            return None

    def armazenar_links(self, link):
        if link not in self.storage_links:
            self