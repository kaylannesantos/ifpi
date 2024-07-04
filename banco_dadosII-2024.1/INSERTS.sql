--------------------------------------------------------INSERT's---------------------------------------------------
-- BLOCO DE INSERÇÃO EM UMA ÚNICA TRANSAÇÃO

DO $$ 
	BEGIN
PERFORM CADASTRAR('CLIENTE','Maria Silva', '123.456.789-10', '(11) 91234-5678', 'maria.silva@gmail.com');
PERFORM CADASTRAR('CLIENTE','João Oliveira', '987.654.321-00', '(21) 99876-5432', 'joao.oliveira@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Ana Santos', '456.789.123-45', '(31) 98765-4321', 'ana.santos@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Pedro Souza', '654.321.987-00', '(41) 97654-3210', 'pedro.souza@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Mariana Lima', '789.123.456-78', '(51) 96543-2109', 'mariana.lima@gmail.com');
PERFORM CADASTRAR('CLIENTE','Márcia Menezes', '123.456.123-22', '(89) 91234-0008', 'menezesmarcia@gmail.com');
PERFORM CADASTRAR('CLIENTE','Kaio Maurílio de Albuquerque', '111.654.111-11', '(21) 99976-5555', 'kaioalbuquerque@gmail.com');
	
PERFORM CADASTRAR('CARGO','Gerente', 2500.00);
PERFORM CADASTRAR('CARGO','Supervisor', 2186.00);
PERFORM CADASTRAR('CARGO','Vendedor', 1427.00);
PERFORM CADASTRAR('CARGO','Operador de Caixa', 1782.00);
PERFORM CADASTRAR('CARGO','Estoquista', 1350.00);

PERFORM CADASTRAR('LOJA','Loja 1');
PERFORM CADASTRAR('LOJA','Loja 2');
PERFORM CADASTRAR('LOJA','Loja 3');
PERFORM CADASTRAR('LOJA','Loja 4');
PERFORM CADASTRAR('LOJA','Loja 5');

PERFORM CADASTRAR('FUNCIONARIO','Gerente','Loja 1','João Silva', '123.456.789-01', '(11) 91234-5678', 'joao.silva@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor','Loja 1','Maria Santos', '987.654.321-09', '(22) 98765-4321', 'maria.santos@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor','Loja 2','Carlos Oliveira', '222.333.444-55', '(33) 87654-3210', 'carlos.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa','Loja 2','Ana Pereira', '555.666.777-99', '(44) 76543-2109', 'ana.pereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista','Loja 3','Pedro Rocha', '111.222.333-44', '(55) 65432-1098', 'pedro.rocha@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Gerente','Loja 3','Mariana Costa', '999.888.777-66', '(66) 54321-0987', 'mariana.costa@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor','Loja 4','Lucas Oliveira', '333.222.111-00', '(77) 43210-9876', 'lucas.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor','Loja 4','Juliana Pereira', '777.888.999-00', '(88) 32109-8765', 'juliana.pereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa','Loja 5','Fernanda Santos', '444.555.666-33', '(99) 21098-7654', 'fernanda.santos@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista','Loja 5','Rafaela Almeida', '666.777.888-11', '(00) 10987-6543', 'rafaela.almeida@email.com');

PERFORM CADASTRAR('PAGAMENTO','Cartão de Crédito');
PERFORM CADASTRAR('PAGAMENTO','Cartão de Débito');
PERFORM CADASTRAR('PAGAMENTO','Dinheiro');
PERFORM CADASTRAR('PAGAMENTO','Transferência Bancária');
PERFORM CADASTRAR('PAGAMENTO','Pix');

PERFORM CADASTRAR('CATEGORIA','Camisetas', 'Camisetas de diversos estilos e cores');
PERFORM CADASTRAR('CATEGORIA','Calças Jeans', 'Calças jeans masculinas e femininas');
PERFORM CADASTRAR('CATEGORIA','Vestidos', 'Vestidos elegantes para diversas ocasiões');
PERFORM CADASTRAR('CATEGORIA','Sapatos', 'Calçados confortáveis e estilosos');
PERFORM CADASTRAR('CATEGORIA','Acessórios', 'Acessórios variados, como bolsas e cintos');

PERFORM CADASTRAR('PRODUTO','Camisetas','Camiseta Básica', 29.99);
PERFORM CADASTRAR('PRODUTO','Camisetas','Camiseta Estampada', 39.99);
PERFORM CADASTRAR('PRODUTO','Calças Jeans','Calça Jeans Skinny', 89.99);
PERFORM CADASTRAR('PRODUTO','Calças Jeans','Calça Jeans Reta', 79.99);
PERFORM CADASTRAR('PRODUTO','Vestidos','Vestido Midi Floral', 129.99);
PERFORM CADASTRAR('PRODUTO','Vestidos','Vestido Longo de Festa', 199.99);
PERFORM CADASTRAR('PRODUTO','Sapatos','Sapato Social Masculino', 149.99);
PERFORM CADASTRAR('PRODUTO','Sapatos','Sapato Anabela Feminino', 119.99);
PERFORM CADASTRAR('PRODUTO','Acessórios','Bolsa Transversal', 79.99);
PERFORM CADASTRAR('PRODUTO','Acessórios','Cinto de Couro', 49.99);

PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Camiseta Estampada','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Calça Jeans Skinny','Loja 3',100);
PERFORM CADASTRAR('ESTOQUE','Calça Jeans Reta','Loja 4',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Midi Floral','Loja 5',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Longo de Festa','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Social Masculino','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Anabela Feminino','Loja 3',100);
PERFORM CADASTRAR('ESTOQUE','Bolsa Transversal','Loja 4',100);
PERFORM CADASTRAR('ESTOQUE','Cinto de Couro','Loja 5',100);
	END $$; -- FECHAMENTO DO BLOCO