--------------------------------------------------------INSERT's---------------------------------------------------

DO $$ 
	BEGIN
PERFORM CADASTRAR('CLIENTE','Maria Silva Oliveira', '123.456.789-10', '(11) 91234-5678', 'maria.silva@gmail.com');
PERFORM CADASTRAR('CLIENTE','João Oliveira Menezes', '987.654.321-00', '(21) 99876-5432', 'joao.oliveira@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Ana Maria Santos ', '456.789.123-45', '(89) 98765-4321', 'ana.santos@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Pedro Souza Gomes', '654.321.987-00', '(86) 97654-3210', 'pedro.souza@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Mariana Lima Silva', '789.123.456-78', '(86) 96543-2109', 'mariana.lima@gmail.com');
PERFORM CADASTRAR('CLIENTE','Márcia Menezes de Sousa', '123.456.123-22', '(89) 91234-0008', 'menezesmarcia@gmail.com');
PERFORM CADASTRAR('CLIENTE','Kaio Maurílio de Albuquerque', '111.654.111-11', '(21) 99976-5555', 'kaioalbuquerque@gmail.com');
PERFORM CADASTRAR('CLIENTE','Antônio Marques da Silva', '100.666.111-11', '(86) 99563-5555', 'antoniomarques@gmail.com');
PERFORM CADASTRAR('CLIENTE','Jessica Maria de Almeida', '098.654.345-22', '(21) 99489-5005', 'kaioalbuquerque@gmail.com');
PERFORM CADASTRAR('CLIENTE','Lucas Lopes Menezes', '989.654.433-11', '(21) 99900-1212', 'kaioalbuquerque@gmail.com');
	
PERFORM CADASTRAR('CARGO','Gerente', 2250.00);
PERFORM CADASTRAR('CARGO','Supervisor', 2186.00);
PERFORM CADASTRAR('CARGO','Vendedor', 1427.00);
PERFORM CADASTRAR('CARGO','Operador de Caixa', 1782.00);
PERFORM CADASTRAR('CARGO','Estoquista', 1350.00);

PERFORM CADASTRAR('LOJA','Loja 1');
PERFORM CADASTRAR('LOJA','Loja 2');
PERFORM CADASTRAR('LOJA','Loja 3');
PERFORM CADASTRAR('LOJA','Loja 4');
PERFORM CADASTRAR('LOJA','Loja 5');

--funcionario loja 1
PERFORM CADASTRAR('FUNCIONARIO','Gerente','Loja 1','João Silva', '123.456.789-01', '(89) 91234-5678', 'joao.silva@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor','Loja 1','Maria Santos', '987.654.321-09', '(89) 98765-4321', 'maria.santos@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor','Loja 1','Carlos Oliveira', '222.333.444-55', '(86) 87654-3210', 'carlos.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa','Loja 1','Ana Pereira', '555.666.777-99', '(86) 76543-2109', 'ana.pereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista','Loja 1','Pedro Rocha', '111.222.333-44', '(21) 65432-1098', 'pedro.rocha@email.com');
	
--funcionario loja 2
PERFORM CADASTRAR('FUNCIONARIO','Gerente','Loja 2','Luana Albuquerque', '390.222.233-00', '(86) 99910-9876', 'luanaalbuquerque@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor','Loja 2','Junior Márcio Gomes', '797.898.000-21', '(86) 32109-8765', 'jrmarcio@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa','Loja 2','Fabricio josé Menezes', '444.555.666-33', '(89) 21098-7654', 'fabriciomenezes@email.com');
	
--funcionario loja 3
PERFORM CADASTRAR('FUNCIONARIO','Gerente','Loja 3','Mariana Costa', '999.888.777-66', '(89) 54321-0987', 'mariana.costa@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor','Loja 3','Lucas Oliveira', '333.222.111-00', '(86) 43210-9876', 'lucas.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa','Loja 3','Fernanda Santos', '444.555.555-33', '(99) 21098-7654', 'fernanda.santos@email.com');
	
--funcionario loja 4
PERFORM CADASTRAR('FUNCIONARIO','Gerente','Loja 4','Luíza Miranda Costa', '777.888.777-66', '(86) 54321-0987', 'mariana.costa@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor','Loja 4','Juliana Pereira', '777.888.999-00', '(89) 32109-8765', 'juliana.pereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista','Loja 4','Rafaela Almeida', '666.777.888-11', '(86) 10987-6543', 'rafaela.almeida@email.com');
	
--funcionario loja 5
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa','Loja 5','Leandro Nunes','089.766.544-33','(86) 99909-7654','leandronunesthe@gmail.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista','Loja 5','Rodrigo De Gomes Monteiro', '666.777.000-11', '(21) 10987-6543', 'rodrigogomesmonteiro@email.com');

PERFORM CADASTRAR('PAGAMENTO','Cartão de Crédito');
PERFORM CADASTRAR('PAGAMENTO','Cartão de Débito');
PERFORM CADASTRAR('PAGAMENTO','Dinheiro');
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

--estoque loja 1
PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Longo de Festa','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Anabela Feminino','Loja 1',100);
PERFORM CADASTRAR('PRODUTO','Cinto de Couro','Loja 1',100);

--estoque loja 2
PERFORM CADASTRAR('ESTOQUE','Camiseta Estampada','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Calça Jeans Skinny','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Anabela Feminino','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Cinto de Couro','Loja 2',100);

--estoque loja 3
PERFORM CADASTRAR('ESTOQUE','Calça Jeans Skinny','Loja 3',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Social Masculino','Loja 3',100);
PERFORM CADASTRAR('ESTOQUE','Cinto de Couro','Loja 3',100);
PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 3',100);

--estoque loja 4
PERFORM CADASTRAR('ESTOQUE','Sapato Anabela Feminino','Loja 4',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Longo de Festa','Loja 4',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Midi Floral','Loja 4',100);
PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 4',100);

--estoque loja 5
PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 5',100);
PERFORM CADASTRAR('ESTOQUE','Camiseta Estampada','Loja 5',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Midi Floral','Loja 5',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Social Masculino','Loja 5',100);
	END $$;