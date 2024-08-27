CREATE TABLE LEITOR(
	COD_LEITOR SERIAL NOT NULL PRIMARY KEY,
	NOME VARCHAR(50) NOT NULL,
	DT_NASC DATE NOT NULL
);

CREATE TABLE FUNCIONARIO(
	COD_FUNC SERIAL NOT NULL PRIMARY KEY,
	NOME VARCHAR(50) NOT NULL
);

CREATE TABLE AUTOR(
	COD_AUTOR SERIAL NOT NULL PRIMARY KEY,
	NOME VARCHAR(50) NOT NULL,
	DT_NASC DATE NOT NULL
);

CREATE TABLE TITULO(
	COD_TIT SERIAL NOT NULL PRIMARY KEY,
	NOME VARCHAR(50) NOT NULL
);

CREATE TABLE LIVRO (
    COD_LIVRO SERIAL PRIMARY KEY NOT NULL,
    COD_TITULO INT NOT NULL REFERENCES TITULO(COD_TIT),
    QUANT_ESTOQUE INT NOT NULL,
    VALOR_UNITARIO REAL NOT NULL
);

CREATE TABLE EXEMPLAR(
	COD_EXEMPLAR SERIAL NOT NULL PRIMARY KEY,
	COD_TIT INT REFERENCES TITULO(COD_TIT)
);

CREATE TABLE AUTORIA(
	COD_AUTORIA SERIAL NOT NULL PRIMARY KEY,
	COD_TIT INT REFERENCES TITULO(COD_TIT),
	COD_AUTOR INT REFERENCES AUTOR(COD_AUTOR)
);

CREATE TABLE EMPRESTIMO(
	COD_EMP SERIAL NOT NULL PRIMARY KEY,
	COD_LEITOR INT REFERENCES LEITOR(COD_LEITOR),
	COD_EX INT REFERENCES EXEMPLAR(COD_EXEMPLAR),
	COD_FUNC INT REFERENCES FUNCIONARIO(COD_FUNC),
	DT_EMP DATE NOT NULL,
	DT_DEV DATE);

CREATE TABLE PEDIDO (
    COD_PEDIDO SERIAL PRIMARY KEY NOT NULL,
    COD_LEITOR INT REFERENCES LEITOR(COD_LEITOR),
	COD_FUNC INT REFERENCES FUNCIONARIO(COD_FUNC),
    DATA_PEDIDO DATE NOT NULL,
    HORA_PEDIDO TIMESTAMP NOT NULL,
    VALOR_TOTAL_PEDIDO REAL NOT NULL,
    QUANT_ITENS_PEDIDOS INT NOT NULL
);

CREATE TABLE ITEM_PEDIDO (
	COD_LIVRO INT REFERENCES LIVRO(COD_LIVRO),
    COD_PEDIDO INT REFERENCES PEDIDO(COD_PEDIDO),
    QUANTIDADE_ITEM INT NOT NULL,
    VALOR_TOTAL_ITEM REAL NOT NULL
);

-----------------------------------------------------------------------------------------------------------------------------------

/*EXERCÍCIO 1) Crie uma função que realiza o pedido de um único livro que possui estoque suficiente. O ato de realizar
pedido consiste em inserir registros nas tabelas Pedido e Item_pedido, além de decrementar a quantidade 
em estoque. Essa funcão deve receber apenas os seguintes parâmetros: Código do pedido, código do livro,
nome do fornecedor (imagine que não existam dois fornecedores com o mesmo nome) e quantidade vendida.*/

/*EXERCÍCIO 2) Crie uma função que realiza o pedido como deve ser. Inserções nas tabelas PEdido e Item_pedido, além
da atualização da quantidade em estoque. No primeiro produto, deve haver inserções nas duas tabelas.
A partir do segundo, apenas na tebela Item_pedido. Não esqueça de decrementar a quantidade em estoque, 
de atualizar o valor total do pedido e a quantidade de itens da tabela pedido.
Os parâmetros passados para a função são os mesmos da questão anterior.*/
