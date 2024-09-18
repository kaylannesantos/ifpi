--GERENTE
SET ROLE "JOÃO SILVA";
SET ROLE GERENTE;

RESET ROLE;

--VENDEDOR
SET ROLE "ANA COSTA";
SET ROLE VENDEDOR;

RESET ROLE;

--OPERADOR DE CAIXA
SET ROLE "CARLOS SANTOS";
SET ROLE OPERADOR_DE_CAIXA;

RESET ROLE;

SELECT CADASTRAR('FUNCIONARIO', 'Carlos Ferreira dos Santos', '127.000.678-78', '(89) 99564-0000', 'carlossantos@email.com', 'Gerente', 'Loja 1');
select * from VER_FUNCIONARIOS;

SELECT * from ALTERAR('funcionario','João Silva', NULL, null,null,'carlossantos@email.com',null,null);
select * from LOJA;

SELECT DELETAR('Cliente', 'Maria Silva Oliveira');
select * from ver_cliente

SELECT * FROM VER_FUNCIONARIO('01-08-2024', CURRENT_DATE);

select * from pedido
select * from item_pedido
select * from estoque
select * from crediario
select * from comissao_funcionario

SELECT * FROM ADD_PEDIDO('Maria Silva Oliveira', 'Sapato Social Masculino', 75, 'Crediário', 'Roberto Pereira',4);
SELECT * FROM PAGAR_PEDIDO('Maria Silva Oliveira');

SELECT * FROM PAGAR_CREDIARIO('Maria Silva Oliveira');

SELECT * FROM COMISSAO_FUNCIONARIO;