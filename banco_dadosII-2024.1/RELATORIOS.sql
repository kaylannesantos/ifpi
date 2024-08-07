-----------------------------------------------------RELATÓRIOS------------------------------------------------------
--FUNCIONARIO
CREATE OR REPLACE VIEW VER_FUNCIONARIOS AS
	SELECT F.COD as "n°Id", F.NOME as Nome, F.CPF as cpf, F.CONTATO as Telefone, F.EMAIL as Email, C.NOME as Cargo, C.SALARIO as Salario, L.NOME as Loja
	FROM FUNCIONARIO F
		JOIN CARGO C ON C.COD = F.COD_CARGO
		JOIN LOJA L ON L.COD = F.COD_LOJA
	ORDER BY F.NOME;

--CLIENTE
CREATE OR REPLACE VIEW VER_CLIENTE AS
	SELECT C.COD as "n°Id", C.NOME as Nome, C.CPF as cpf, C.CONTATO as Telefone, C.EMAIL as Email
	FROM CLIENTE C ORDER BY C.NOME;

--PRODUTO
CREATE OR REPLACE VIEW VER_PRODUTO AS 
	SELECT 
		C.COD AS "id°Categoria", 
		C.NOME AS CATEGORIA, 
		P.COD AS "id°Produto",
		P.NOME AS PRODUTO, 
		P.VALOR_UNITARIO AS VALOR, 
		L.COD AS "id°Loja",
		L.NOME AS LOJA, 
		E.QUANTIDADE AS "Quantidade em Estoque"
	FROM CATEGORIA C
		JOIN PRODUTO P ON P.COD_CATEGORIA = C.COD
		JOIN ESTOQUE E ON E.COD_PRODUTO = P.COD
		JOIN LOJA L ON E.COD_LOJA = L.COD
	ORDER BY C.COD;

--PEDIDO
CREATE OR REPLACE FUNCTION RELATORIO_PEDIDO(DT_I DATE, DT_F DATE)
RETURNS TABLE(
	"Produto" VARCHAR(100), 
	"Quantidade" INT, 
	"Valor Total" NUMERIC(8,2), 
	"Média Quantidade" INT, 
	"Média Valor Total" NUMERIC (8,2)) 
AS $$
DECLARE
	DIAS INT;
BEGIN
	SELECT EXTRACT('DAY' FROM AGE(DT_F,DT_I)) INTO DIAS;

	RETURN QUERY 
		SELECT 
			PDT.NOME PRODUTO, 
			SUM(IP.QUANTIDADE)::INT QUANTIDADE, 	
			SUM(IP.QUANTIDADE * PDT.VALOR_UNITARIO)::NUMERIC(8,2) VALOR_TOTAL,
			AVG(IP.QUANTIDADE/DIAS)::INT MEDIA_QUANTIDADE,
			AVG((IP.QUANTIDADE * PDT.VALOR_UNITARIO)/DIAS)::NUMERIC(8,2) MEDIA_VALOR_TOTAL
		FROM PEDIDO P
			JOIN ITEM_PEDIDO IP ON P.COD = IP.COD_PEDIDO
			JOIN ESTOQUE E ON E.COD = IP.COD_ESTOQUE
			JOIN PRODUTO PDT ON PDT.COD = E.COD_PRODUTO
		--WHERE PAGO = TRUE AND DATA_HORA BETWEEN DT_I AND DT_F
		WHERE 
			PAGO = TRUE 
			AND DATA_HORA >= DT_I 
			AND DATA_HORA < (DT_F + INTERVAL '1 DAY')
		GROUP BY PRODUTO;
END;
$$ LANGUAGE PLPGSQL;

--Nota fiscal
CREATE OR REPLACE VIEW PEDIDOS AS 
SELECT 
	PDD.COD Pedido, 
	C.NOME Cliente, 
	P.NOME Produto, 
	F.NOME Funcionario,
	P.VALOR_UNITARIO Valor, 
	IP.QUANTIDADE Quantidade, 
	(P.VALOR_UNITARIO * IP.QUANTIDADE) Total, 
	(TO_CHAR(PDD.DATA_HORA, 'DD-MM-YYYY'))::VARCHAR(10) Data, 
	(TO_CHAR(PDD.DATA_HORA, 'HH24:MI:SS'))::VARCHAR(8) Hora,
	PDD.PAGO PAGO
FROM PEDIDO PDD 
	JOIN ITEM_PEDIDO IP ON IP.COD_PEDIDO = PDD.COD 
	JOIN ESTOQUE E ON E.COD = IP.COD_ESTOQUE 
	JOIN CLIENTE C ON C.COD = PDD.COD_CLIENTE 
	JOIN PRODUTO P ON P.COD = E.COD_PRODUTO 
	JOIN FUNCIONARIO F ON F.COD = PDD.COD_FUNCIONARIO
ORDER BY PDD.COD DESC;

-- Carnê crediário 

CREATE OR REPLACE VIEW CARNE_CREDIARIO AS --DROP VIEW CARNE_CREDIARIO
SELECT 
	'n°' || C.QUANTIDADE_PARCELA as "Parcela",
	CLI.NOME as "Cliente",
	CLI.CPF as cpf,
	PROD.NOME as "Produto",
	IP.QUANTIDADE as "Quantidade",
	PROD.VALOR_UNITARIO as "Valor",
    CASE 
        WHEN C.VALOR_JUROS IS NULL OR C.VALOR_JUROS = 0.00 THEN 'Sem Juros'
        ELSE C.VALOR_JUROS::VARCHAR
    END AS "Valor Juros",
	C.VALOR_PARCELA as "Valor Parcela",
	L.NOME as "Loja",
	L.CNPJ as "cnpj",
	F.NOME as "Funcionário",
	(TO_CHAR(C.DATA_VENCIMENTO, 'DD-MM-YYYY'))::VARCHAR(10) as "Data Vencimento",
	COALESCE((TO_CHAR(C.DATA_PAGAMENTO, 'DD-MM-YYYY'))::VARCHAR(10), '___/___/____') as "Data Pagamento",
	C.COD_PEDIDO as "id°Pedido"
FROM CREDIARIO C 
	JOIN PEDIDO P ON P.COD = C.COD_PEDIDO
	JOIN ITEM_PEDIDO IP ON IP.COD_PEDIDO = P.COD
	JOIN ESTOQUE E ON E.COD = IP.COD_ESTOQUE
	JOIN PRODUTO PROD ON PROD.COD = E.COD_PRODUTO
	JOIN LOJA L ON L.COD = E.COD_LOJA
	JOIN CLIENTE CLI ON CLI.COD = P.COD_CLIENTE
	JOIN FUNCIONARIO F ON F.COD = P.COD_FUNCIONARIO
ORDER BY C.QUANTIDADE_PARCELA;