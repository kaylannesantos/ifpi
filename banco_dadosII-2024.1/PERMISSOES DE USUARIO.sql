-----------------------GERENCIAMENTO DE USUÁRIOS E PERMISSÕES DE ACESSO----------------------------------------------------
--GERENTE
CREATE ROLE GERENTE
	--TABELAS
	GRANT SELECT ON NOME_TABELA TO GERENTE
	--FUNCOES
	
--SUPERVISOR
CREATE ROLE SUPERVISOR
	--TABELAS
	GRANT SELECT ON NOME_TABELA TO SUPERVISOR
	--FUNCOES
	
--VENDEDOR
CREATE ROLE VENDEDOR
	--TABELAS
	GRANT SELECT ON NOME_TABELA TO VENDEDOR
	--FUNCOES
	
--OPERADOR DE CAIXA
CREATE ROLE OPERADOR_DE_CAIXA
	--TABELAS
	GRANT SELECT ON NOME_TABELA TO OPERADOR_DE_CAIXA
	--FUNCOES
	
--ESTOQUISTA
CREATE ROLE ESTOQUISTA
	--TABELAS
	--FUNCOES

--USUARIOS
CREATE USER "USERNAME" WITH SENHA; --OPCIONAL A SENHA

--CONJUNTOS
GRANT TIPO_ROLE TO "USERNAME"


--ENTRAR E SAIR DE UM USUARIO/ROLE
