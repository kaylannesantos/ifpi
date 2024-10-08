#### Primeiro Mini Projeto - Montadora de Veículos (PatroCars)

## Descrição

O projeto **Montadora de Veículos** é um sistema web CRUD básico desenvolvido com **FastAPI** e **PostgreSQL**. O sistema permite o gerenciamento de montadoras e veículos associados, oferecendo funcionalidades para adicionar, listar, editar e remover montadoras e veículos.

## Funcionalidades

- Adicionar montadoras
- Listar montadoras
- Editar montadoras
- Remover montadoras
- Adicionar veículos
- Listar veículos
- Editar veículos
- Remover veículos

## Tecnologias Utilizadas

- **Python**: Linguagem de programação
- **FastAPI**: Framework para desenvolvimento de APIs
- **PostgreSQL**: Sistema de gerenciamento de banco de dados
- **Jinja2**: Motor de template para renderização de HTML
- **ULID**: Geração de identificadores únicos

## Pré-requisitos

- Python 3.7 ou superior
- PostgreSQL
- pip (gerenciador de pacotes do Python)

## Instalação

Siga os passos abaixo para configurar o ambiente e instalar as dependências necessárias:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu_usuario/montadoraDeVeiculos.git
   cd montadoraDeVeiculos

2. **Crie um ambiente virtual (opcional, mas recomendado)**:
    ```bash
    bash
    Copiar código
    python -m venv venv
    source venv/bin/activate  # Para Linux/Mac
    venv\Scripts\activate     # Para Windows

3. **Instale as dependências: Crie um arquivo requirements.txt com o seguinte conteúdo**:
    ```bash
    fastapi
    uvicorn
    psycopg2-binary
    jinja2
    python-ulid
**Então, execute o comando**:
    ```bash
    pip install -r requirements.txt

4. **Crie a base de dados no PostgreSQL**:
    ```bash
    CREATE DATABASE montadora_db;
    CREATE TABLE montadoras (
    id VARCHAR PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    ano_fundacao INT NOT NULL
    );

    CREATE TABLE modelos (
        id VARCHAR PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        montadora_id VARCHAR REFERENCES montadoras(id) ON DELETE CASCADE,
        valor_referencia NUMERIC NOT NULL,
        motorizacao NUMERIC NOT NULL,
        turbo BOOLEAN NOT NULL,
        automatico BOOLEAN NOT NULL
    );

    CREATE TABLE veiculos (
        id VARCHAR PRIMARY KEY,
        modelo_id VARCHAR REFERENCES modelos(id) ON DELETE CASCADE,
        cor VARCHAR(50) NOT NULL,
        ano_fabricacao INT NOT NULL,
        ano_modelo INT NOT NULL,
        valor NUMERIC NOT NULL,
        placa VARCHAR(20) NOT NULL UNIQUE,
        vendido BOOLEAN NOT NULL DEFAULT FALSE
    );

5. **Inicie o servidor FastAPI**:
    ```bash
    uvicorn app.main:app --reload
