## Instalação - Redis

1. Instalar o Subsistema do Windows para Linux:
    bash ```
    wsl --install Ubuntu

2. Durante a instalação ele pede para você criar um usuário e senha;

3. Atualize a lista de pacotes:
    bash ```
    sudo apt update

4. Instale o Redis:
    bash ```
    sudo apt install redis-server

5. Verifique a versão do Redis:
    bash ```
    redis-server --version

6. Inicie o servidor Redis:
    bash ```
    redis-server

7. Inicie a conexão:
    bash ```
    redis-cli

8. Para saber se a conexão foi feita corretamente:
    bash ```
    ping

9. Teste: 
    bash ```
    set chave "valor"
    keys *
    get chave

10. Para encerrar a conexão:
    bash ```
    exit

