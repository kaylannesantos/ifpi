--FUNCAO REALIZAR VENDA
CREATE OR REPLACE FUNCTION ADD_VENDA(COD_V INT, NOME_P VARCHAR(30), NOME_LJ VARCHAR(30), NOME_C VARCHAR, NOME_V VARCHAR(30), QTD_V INT)
RETURNS VOID 
AS $$
DECLARE
	COD_P INT;
	VALOR_TT REAL; 
	DT_V DATE; 
	COD_C INT;
	COD_V INT;
	COD_PROD_C INT; 
BEGIN
	SELECT COD_PROD INTO COD_P FROM PRODUTO
	SELECT VALOR_TOTAL INTO VALOR_TT FROM VENDA 
	SELECT DT_VENDA INTO DT_V FROM VENDA
	SELECT COD_CLI INTO COD_C FROM VENDA 
	SELECT COD_VENDEDOR INTO COD_V FROM VENDA
	SELECT COD_PROD_COMBO INTO COD_PROD_C FROM COMBO
	
	IF NOT EXISTS(SELECT * FROM VENDA COD_V = COD_VENDA)THEN 
		IF EXISTS(SELECT * FROM PRODUTO WHERE COD_P = COD_PROD)
			INSERT INTO VENDA(COD_VENDA, COD_CLI, COD_VENDEDOR, DT_VENDA, VALOR_TOTAL, QUANT_ITENS) 
			VALUES(COD_V, COD_C, COD_V, CURRENT_DATE, VALOR_TT, QTD_V );
			UPDATE COMBO SET QUANT = QUANT + QUANT
			WHERE COD_PROD_C = COD_PROD_COMBO
		ELSE
			RAISE EXCEPTION 'PRODUTO NÃO ENCONTRADO!'
		END IF;
	ELSIF EXISTS(SELECT * FROM VENDA COD_V = COD_VENDA)THEN 
		UPDATE ITEM_VENDA SET QUANT_VENDIDA = QUANT_VENDIDA + (QUANT_VENDIDA * QUANT_ITENS),
							  VALOR_TOTAL_ITEM = VALOR_TOTAL_ITEM + VALOR_TOTAL
		WHERE COD_V = COD_VENDA;
	END IF; 
END;
$$
LANGUAGE 'plpgsql'

--FUNCAO VALOR DA COMISSAO DO VENDEDOR
CREATE OR REPLACE FUNCTION VALOR_COMISSAO_V(NOME_V VARCHAR(30), DT_I DATE, DT_F DATE)
RETURNS REAL
AS $$ 
DECLARE 
	VALOR_TT_V REAL;
BEGIN 
	SELECT NOME_VENDEDOR INTO NOME_V FROM VENDEDOR
	SELECT VALOR_TOTAL INTO VALOR_TT_V FROM VENDA
	IF EXISTS(SELECT * FROM VENDEDOR WHERE NOME_V = NOME_VENDEDOR )THEN 
		SELECT ((VALOR_TOTAL + (5/100)) * (DT_I - DT_F)) AS COMISSAO FROM VENDA
		RETURN COMISSAO
	END IF;
END;
$$
LANGUAGE 'plpgsql'

-- TRIGGERS 
-- 1° NÃO PERMITIR QUE UM COMBO COMPONHA OURTRO
CREATE OR REPLACE FUNCTION TG_COMBO()
RETURNS TRIGGER 
AS $$
BEGIN 
	IF EXISTS(SELECT * FROM COMBO WHERE COD_PROD = COD_PROD_COMBO)THEN 
		RAISE EXCEPTION 'O PRODUTO COMBO NÃO PODE COMPOR OUTRO COMBO!';
	ELSIF NOT EXISTS(SELECT * FROM COMBO WHERE COD_PROD = COD_PROD_COMBO)THEN
		INSERT INTO COMBO(CO_PROD_COMBO, COD_PROD, QUANT) 
		VALUES(COD_P_C, COD_P, QTD)
	END IF;
END;
$$
LANGUAGE 'plpgsql'

--SCRIPT ISRAEL
-- QUESTÃO 01(A)
CREATE TRIGGER TG_CADASTRAR_COMBO
BEFORE INSERT ON COMBO
FOR EACH ROW
EXECUTE PROCEDURE FUNC_CADASTRAR_COMBO;

CREATE OR REPLACE FUNCTION FUNC_CADASTRAR_COMBO
RETURNS TRIGGERS AS $$
DECLARE 
BEGIN

IF EXISTS (SELECT * FROM COMBO WHERE COD_PROD_COMBO = NEW.COD_PROD ) THEN
 RAISE EXCEPTION 'O Produto inserido já é um combo. Não pode fazer parte de outro combo.'
END IF;

RETURN NEW
END;
$$
LANGUAGE 'plpgsql'


--QUESTÃO 01 (B)
CREATE TRIGGER TG_VERIFICA_VENDEDOR
BEFORE INSERT ON ITEM_VENDA
FOR EACH ROW
EXECUTE PROCEDURE FUNC_VERIFICA_VENDEDOR;

CREATE OR REPLACE FUNCTION FUNC_VERIFICA_VENDEDOR
RETURNS TRIGGERS AS $$
DECLARE 
CODLOJA_DO_VENDENDOR INT;
CODLOJA_DO_ITEM INT;
BEGIN

SELECT COD_LOJA INTO CODLOJA_DO_VENDENDOR FROM ITEM_VENDA NATURAL JOIN VENDA NATURAL JOIN VENDEDOR;
SELECT COD_LOJA INTO CODLOJA_DO_ITEM FROM ITEM_VENDA NATURAL JOIN ESTOQUE;

IF (CODLOJA_DO_VENDEDOR != CODLOJA_DO_ITEM) THEN
	RAISE EXCEPTION 'O Vendedor não pode vender produtos de outra loja';
END IF;

RETURN NEW
END;
$$
LANGUAGE 'plpgsql'


-- QUESTÃO 01 (C)

CREATE TRIGGER TG_VERIFICA_ESTOQUE
BEFORE INSERT OR UPDATE ON ESTOQUE
FOR EACH ROW
EXECUTE PROCEDURE FUNC_VERIFICA_ESTOQUE;

CREATE OR REPLACE FUNCTION FUNC_VERIFICA_ESTOQUE
RETURNS TRIGGERS AS $$
DECLARE 
BEGIN

FOR REG IN (SELECT COMBO.QUANT, ESTOQUE.QUANT_ESTOQUE FROM COMBO NATURAL JOIN PRODUTO NATURAL JOIN ESTOQUE WHERE COMBO.QUANT = NEW.COD_PROD) LOOP
	IF 
END LOOP


RETURN NEW
END;
$$
LANGUAGE 'plpgsql'


-- QUESTÃO 02
CREATE OR REPLACE FUNCTION REALIZA_VENDA (CV INT, NP VARCHAR(50), NC VARCHAR(50), NV VARCHAR(50), QV INT)
RETURNS VOID
AS $$
DECLARE 
CE INT; --CÓDIGO DO ESTOQUE
VU REAL; -- VALOR UNITÁRIO DO PRODUTO
VTI REAL; -- VALOR TOTAL DO ITEM
QE INT; --quantidade em estoque
BEGIN

SELECT COD_ESTOQUE INTO CE FROM ESTOQUE NATURAL JOIN PRODUTO WHERE NOME_PROD ILIKE NP;
SELECT VALOR_UNITARIO INTO VU FROM PRODUTO WHERE NOME_PROD ILIKE NP;
VTI := VU * QV;
SELECT QUANT_ESTOQUE INTO QE FROM ESTOQUE NATURAL JOIN PRODUTO WHERE NOME_PROD ILIKE NP;

IF (QV > QE) THEN
	RAISE EXCEPTION 'Não há estoque suficiente para essa quantidade vendida !!';
END IF;

IF EXISTS (SELECT * FROM INTEM_VENDA WHERE COD_ESTOQUE = CE AND COD_VENDA = CV) THEN
	UPDATE ITEM_VENDA SET QUANT_VENDIDA = QUANT_VENDIDA + QV WHERE COD_ESTOQUE = CE AND COD_VENDA = CV;
	UPDATE ITEM_VENDA SET VALOR_TOTAL_ITEM = QUANT_VENDIDA * VU WHERE COD_ESTOQUE = CE AND COD_VENDA = CV;
	UPDATE ESTOQUE SET QUANT_ESTOQUE = QUANT_ESTOQUE - QV WHERE COD_ESTOQUE = CE;
ELSE
	INSERT INTO ITEM_VENDA VALUES (CV, CE, QV, VTI);
	UPDATE ESTOQUE SET QUANT_ESTOQUE = QUANT_ESTOQUE - QV WHERE COD_ESTOQUE = CE;
END IF;

END;
$$
LANGUAGE 'plpgsql'


-- QUESTÃO 03
CREATE OR REPLACE FUNCTION CALCULA_COMISSAO (NOME VARCHAR(50), DT_INI DATE, DT_FIM DATE)
RETURNS REAL
AS $$
DECLARE 
COD INT;
COMISSAO REAL;
T_VENDAS REAL;
BEGIN

SELECT COD_VENDEDOR INTO COD FROM VENDEDOR WHERE NOME_VENDEDOR ILIKE NOME;

CREATE OR REPLACE VIEW VISAO_COMISSAO AS
SELECT COD_VENDEDOR, SUM(VALOR_TOTAL) TOTAL_VENDAS FROM VENDA WHERE (DT_VENDA BETWEEN DT_INI AND DT_FIM) AND (COD_VENDEDOR = COD) GROUP BY COD_VENDEDOR; 

SELECT TOTAL_VENDAS INTO T_VENDAS FROM VISAO_COMISSAO;

COMISSAO := T_VENDAS * 0.05;

RETURN COMISSAO;

END;
$$
LANGUAGE 'plpgsql'

--SCRIPT DO PROFESSOR
SELECT DECREMENTA_PROD(4,2)

CREATE OR REPLACE FUNCTION DECREMENTA_PROD(COD INT,QUANTIDADE INT)
RETURNS VOID
AS $$
BEGIN
UPDATE PRODUTO SET QUANT=QUANT-QUANTIDADE WHERE COD_PROD=COD;
IF EXISTS (SELECT * FROM COMBO WHERE COD_PROD_COMBO=COD) THEN
	UPDATE PRODUTO P SET QUANT=P.QUANT-(QUANTIDADE*C.QUANT)
	FROM COMBO C
	WHERE P.COD_PROD=C.COD_PROD_COMPOE
	AND COD_PROD_COMBO=COD;
END IF;
END;
$$
LANGUAGE PLPGSQL