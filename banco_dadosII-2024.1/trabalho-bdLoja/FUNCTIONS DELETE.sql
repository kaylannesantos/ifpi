------------------------------------------------FUNCTIONS DELETE-----------------------------------------------------
CREATE OR REPLACE FUNCTION DELETE_CLIENTE(IDENTIFICADOR_C VARCHAR(100)) --DROP FUNCTION DELETE_CLIENTE
RETURNS VOID AS $$
--DECLARE 
	--MESSAGE VARCHAR;
BEGIN
	IF NOT EXISTS(SELECT * FROM CLIENTE WHERE NOME ILIKE IDENTIFICADOR_C OR CPF = IDENTIFICADOR_C) THEN
		RAISE EXCEPTION 'O CLIENTE % FOI ENCONTRADO.', IDENTIFICADOR_C;
	ELSE
		BEGIN 
			DELETE FROM CLIENTE WHERE NOME ILIKE IDENTIFICADOR_C OR CPF = IDENTIFICADOR_C;
			RAISE NOTICE 'CLIENTE % DELETADO COM SUCESSO.',IDENTIFICADOR_C;
			--MESSAGE:= 'CLIENTE '|| IDENTIFICADOR_C ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR O CLIENTE %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTE CLIENTE.', IDENTIFICADOR_C;
		END;
	END IF;
	
	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_CARGO(IDENTIFICADOR_CAR VARCHAR(50))--DROP FUNCTION DELETE_CARGO
RETURNS VOID AS $$
--DECLARE
	--MESSAGE VARCHAR;
BEGIN
	IF NOT EXISTS(SELECT * FROM CARGO WHERE NOME ILIKE IDENTIFICADOR_CAR) THEN
		RAISE EXCEPTION 'O CARGO % FOI ENCONTRADO.', IDENTIFICADOR_CAR;
	ELSE
		BEGIN 
			DELETE FROM CARGO WHERE NOME ILIKE IDENTIFICADOR_CAR;
			RAISE NOTICE 'CARGO % DELETADO COM SUCESSO.',IDENTIFICADOR_CAR;
			--MESSAGE:= 'CARGO '|| IDENTIFICADOR_CAR ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR O CARGO %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTE CARGO.', IDENTIFICADOR_C;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_LOJA(IDENTIFICADOR_L VARCHAR(20))--DROP FUNCTION DELETE_LOJA
RETURNS VOID AS $$ 
--DECLARE
	--MESSAGE VARCHAR;
BEGIN 
	IF NOT EXISTS(SELECT * FROM LOJA WHERE NOME ILIKE IDENTIFICADOR_L OR CNPJ ILIKE IDENTIFICADOR_L) THEN
		RAISE EXCEPTION '% FOI ENCONTRADO.', IDENTIFICADOR_L;
	ELSE
		BEGIN 
			DELETE FROM LOJA WHERE NOME ILIKE IDENTIFICADOR_L OR CNPJ ILIKE IDENTIFICADOR_L;
			RAISE NOTICE '% DELETADA COM SUCESSO.',IDENTIFICADOR_L;
			--MESSAGE:= IDENTIFICADOR_L ||' DELETADA COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTA LOJA.', IDENTIFICADOR_L;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_FUNCIONARIO(IDENTIFICADOR_F VARCHAR(100)) --DROP FUNCTION DELETE_FUNCIONARIO
RETURNS VOID AS $$
--DECLARE
	--MESSAGE VARCHAR;
BEGIN
	IF NOT EXISTS(SELECT * FROM FUNCIONARIO WHERE NOME ILIKE IDENTIFICADOR_F OR CPF ILIKE IDENTIFICADOR_F) THEN
		RAISE EXCEPTION 'O FUNCIONARIO % FOI ENCONTRADO.', IDENTIFICADOR_F;
	ELSE
		BEGIN 
			DELETE FROM FUNCIONARIO WHERE NOME ILIKE IDENTIFICADOR_F OR CPF ILIKE IDENTIFICADOR_F;
			RAISE NOTICE 'FUNCIONARIO % DELETADO COM SUCESSO.',IDENTIFICADOR_F;
			--MESSAGE:= 'FUNCIONARIO '|| IDENTIFICADOR_F ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR O FUNCIONARIO %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTE FUNCIONARIO.', IDENTIFICADOR_F;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_PAGAMENTO(IDENTIFICADOR_PAG VARCHAR(50))--DROP FUNCTION DELETE_PAGAMENTO
RETURNS VOID AS $$ 
--DECLARE
	--MESSAGE VARCHAR;
BEGIN 
	IF NOT EXISTS(SELECT * FROM PAGAMENTO WHERE NOME ILIKE IDENTIFICADOR_PAG) THEN
		RAISE EXCEPTION 'O PAGAMENTO % FOI ENCONTRADO.', IDENTIFICADOR_PAG;
	ELSE
		BEGIN 
			DELETE FROM PAGAMENTO WHERE NOME ILIKE IDENTIFICADOR_PAG;
			RAISE NOTICE 'PAGAMENTO % DELETADO COM SUCESSO.',IDENTIFICADOR_PAG;
			--MESSAGE:= 'PAGAMENTO '|| IDENTIFICADOR_PAG ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR O PAGAMENTO %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTE PAGAMENTO.', IDENTIFICADOR_PAG;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_CATEGORIA(IDENTIFICADOR_CAT VARCHAR(50)) --DROP FUNCTION DELETE_CATEGORIA
RETURNS VOID AS $$ 
--DECLARE
	--MESSAGE VARCHAR;
BEGIN
	IF NOT EXISTS(SELECT * FROM CATEGORIA WHERE NOME ILIKE IDENTIFICADOR_CAT ) THEN
		RAISE EXCEPTION 'A CATEGORIA % NÃO FOI ENCONTRADO.', IDENTIFICADOR_CAT;
	ELSE
		BEGIN 
			DELETE FROM CATEGORIA WHERE NOME ILIKE IDENTIFICADOR_CAT;
			RAISE NOTICE 'CATEGORIA % DELETADA COM SUCESSO.',IDENTIFICADOR_CAT;
			--MESSAGE:= 'CATEGORIA '|| IDENTIFICADOR_CAT ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR A CATEGORIA %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTA CATEGORIA.', IDENTIFICADOR_CAT;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_PRODUTO(IDENTIFICADOR_P VARCHAR(50)) --DROP FUNCTION DELETE_PRODUTO
RETURNS VOID AS $$
--DECLARE
	--MESSAGE VARCHAR;
BEGIN
	IF NOT EXISTS(SELECT * FROM PRODUTO WHERE NOME ILIKE IDENTIFICADOR_P ) THEN
		RAISE EXCEPTION 'O PRODUTO % NÃO FOI ENCONTRADO.', IDENTIFICADOR_P;
	ELSE
		BEGIN 
			DELETE FROM PRODUTO WHERE NOME ILIKE IDENTIFICADOR_P;
			RAISE NOTICE 'PRODUTO % DELETADO COM SUCESSO.',IDENTIFICADOR_P;
			--MESSAGE:= 'PRODUTO '|| IDENTIFICADOR_P ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR O PRODUTO %. EXISTEM DADOS RELACIONADOS QUE DEPENDEM DESTE PRODUTO.', IDENTIFICADOR_P;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETE_ESTOQUE(IDENTIFICADOR_P VARCHAR(50), IDENTIFICADOR_L VARCHAR(20))--DROP FUNCTION DELETE_ESTOQUE
RETURNS VOID AS $$
DECLARE
	COD_P INT;
	COD_L INT;
	--MESSAGE VARCHAR;
BEGIN 
	SELECT COD INTO COD_P FROM PRODUTO WHERE NOME ILIKE IDENTIFICADOR_P;
	SELECT COD INTO COD_L FROM LOJA WHERE NOME ILIKE IDENTIFICADOR_L OR CNPJ ILIKE IDENTIFICADOR_L;
	
	IF NOT EXISTS(SELECT * FROM ESTOQUE WHERE COD_PRODUTO = COD_P AND COD_LOJA = COD_L) THEN
		RAISE EXCEPTION 'O ESTOQUE DO PRODUTO % NA % NÃO EXISTE.', IDENTIFICADOR_P, IDENTIFICADOR_L;
	ELSE
		BEGIN 
			DELETE FROM ESTOQUE WHERE COD_PRODUTO = COD_P AND COD_LOJA = COD_L;
			RAISE NOTICE 'ESTOQUE DO PRODUTO % NA % FOI DELETADO COM SUCESSO.',IDENTIFICADOR_P,IDENTIFICADOR_P;
			--MESSAGE:= 'ESTOQUE DO PRODUTO '|| IDENTIFICADOR_P ||' NA '|| IDENTIFICADOR_L ||' DELETADO COM SUCESSO.';
		EXCEPTION
			WHEN foreign_key_violation THEN
				RAISE EXCEPTION 'NÃO FOI POSSÍVEL EXCLUIR O ESTOQUE DO PRODUTO % E % NÃO EXISTE. EXISTEM DADOS QUE DEPENDEM DESTE ESTOQUE.', IDENTIFICADOR_P, IDENTIFICADOR_L;
		END;
	END IF;

	--RETURN MESSAGE;
END;
$$ LANGUAGE PLPGSQL;

----------------------------------------------FUNCAO DELETAR--------------------------------------------------

CREATE OR REPLACE FUNCTION DELETAR(TABELA VARCHAR(50), IDENTIFICADOR VARCHAR(100))--DROP FUNCTION DELETAR(VARCHAR,VARCHAR)
RETURNS VOID AS $$
--DECLARE
	--MESSAGE VARCHAR;
BEGIN
	IF TABELA ILIKE 'CLIENTE' THEN
		PERFORM DELETE_CLIENTE(IDENTIFICADOR);
		--MESSAGE:= DELETE_CLIENTE(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'CARGO' THEN
		PERFORM DELETE_CARGO(IDENTIFICADOR);
		--MESSAGE:= DELETE_CARGO(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'LOJA' THEN
		PERFORM DELETE_LOJA(IDENTIFICADOR);
		--MESSAGE:= DELETE_LOJA(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'FUNCIONARIO' THEN
		PERFORM DELETE_FUNCIONARIO(IDENTIFICADOR);
		--MESSAGE:= DELETE_FUNCIONARIO(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'PAGAMENTO' THEN
		PERFORM DELETE_PAGAMENTO(IDENTIFICADOR);
		--MESSAGE:= DELETE_PAGAMENTO(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'CATEGORIA' THEN
		PERFORM DELETE_CATEGORIA(IDENTIFICADOR);
		--MESSAGE:= DELETE_CATEGORIA(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'PRODUTO' THEN
		PERFORM DELETE_PRODUTO(IDENTIFICADOR);
		--MESSAGE:= DELETE_PRODUTO(IDENTIFICADOR);
		--RAISE INFO '%', MESSAGE;
	ELSIF TABELA ILIKE 'ESTOQUE' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA ESTOQUE.';
	ELSE
		RAISE EXCEPTION 'TABELA NÃO ENCONTRADA.';
	END IF;

	--RETURN MESSAGE;
END;
$$  LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION DELETAR(TABELA VARCHAR(50), PRODUTO VARCHAR(50), LOJA VARCHAR(20)) --DROP FUNCTION DELETAR(VARCHAR, VARCHAR, VARCHAR)
RETURNS VOID AS $$
--DECLARE
	--MESSAGE VARCHAR;
BEGIN
	IF TABELA ILIKE 'CLIENTE' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA CLIENTE.';
	ELSIF TABELA ILIKE 'CARGO' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA CARGO.';
	ELSIF TABELA ILIKE 'LOJA' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA LOJA.';
	ELSIF TABELA ILIKE 'FUNCIONARIO' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA FUNCIONARIO.';
	ELSIF TABELA ILIKE 'PAGAMENTO' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA PAGAMENTO.';
	ELSIF TABELA ILIKE 'CATEGORIA' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA CATEGORIA.';
	ELSIF TABELA ILIKE 'PRODUTO' THEN
		RAISE EXCEPTION 'PARÂMETROS INCORRETOS PARA A TABELA PRODUTO.';
	ELSIF TABELA ILIKE 'ESTOQUE' THEN
		PERFORM DELETE_ESTOQUE(PRODUTO, LOJA);
		--MESSAGE:= DELETE_ESTOQUE(PRODUTO, LOJA);
		--RAISE INFO '%', MESSAGE;
	END IF;
	
	--RETURN MESSAGE;
END;
$$  LANGUAGE PLPGSQL;

SELECT * FROM CLIENTE;
SELECT * FROM FUNCIONARIO;
SELECT * FROM PRODUTO;
SELECT * FROM ESTOQUE;
SELECT * FROM CATEGORIA;
SELECT * FROM LOJA;
SELECT * FROM CARGO;
SELECT * FROM PAGAMENTO;
SELECT * FROM PEDIDO;

--SELECT * FROM DELETAR('estoque', 'Camiseta Básica', 'Loja 1')