--------------------------------------------------------INSERT's---------------------------------------------------
DO $$ 
	BEGIN
PERFORM CADASTRAR('CLIENTE','Maria Silva Oliveira', '123.456.789-10', '(86) 99234-5678', 'mariasilva@gmail.com');
PERFORM CADASTRAR('CLIENTE','João Oliveira Menezes', '987.654.321-00', '(89) 99876-5432', 'j.oliveira@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Ana Maria Santos', '456.789.123-45', '(89) 98765-4321', 'anamsantos@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Pedro Souza Gomes', '654.321.987-00', '(86) 97654-3210', 'pedrogomes@gmail.com'); 
PERFORM CADASTRAR('CLIENTE','Mariana Lima Silva', '789.123.456-78', '(86) 96543-2109', 'marisilva@gmail.com');
	
PERFORM CADASTRAR('CARGO','Gerente', 2150.00, 0.00);
PERFORM CADASTRAR('CARGO','Vendedor', 1650.00, 0.1);
PERFORM CADASTRAR('CARGO','Operador de Caixa', 1412.00, 0.05);

PERFORM CADASTRAR('LOJA', 'Loja 1', '12.345.678/0001-95', 'Rua Aviador, Centro, Teresina (PI), N°6770, CEP 12345-678');
PERFORM CADASTRAR('LOJA', 'Loja 2', '12.345.678/0002-86', 'Avenida Benhur Marques, Bairro Árvores Verdes, Altos (PI), N°456, CEP 23456-789');
--PERFORM CADASTRAR('LOJA', 'Loja 3', '12.345.678/0003-77', 'Rua Isidoro Martins, Bairro Vermelha, Teresina (PI), N°2002, CEP 34567-890');
--PERFORM CADASTRAR('LOJA', 'Loja 4', '12.345.678/0004-68', 'Rua Alameda Dos Ipês, Bairro Primavera, Teresina (PI), N°602, CEP 45678-901');
--PERFORM CADASTRAR('LOJA', 'Loja 5', '12.345.678/0005-59', 'Praça Esperança, Bairro Ministro Portela, José De Freitas (PI), N°2770, CEP 56789-012');

--funcionario loja 1
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 1', 'João Silva', '123.456.789-01', '(89) 91234-5678', 'joaosilva@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 1', 'Carlos Santos', '345.678.901-23', '(89) 93456-7890', 'carlossantos@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 1', 'Ana Costa', '456.789.012-34', '(89) 94567-8901', 'ana.costa@email.com');
	
--funcionario loja 2
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 2', 'Lucas Almeida', '678.901.234-56', '(89) 96789-0123', 'lucas.almeida@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 2', 'Roberto Pereira', '890.123.456-78', '(89) 98901-2345', 'robertopereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 2', 'Juliana Martins', '901.234.567-89', '(89) 99012-3456', 'jumartins@email.com');
	
--funcionario loja 3
--PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 3', 'Juliana Rocha', '234.567.890-12', '(86) 91234-5678', 'julianarocha@email.com');
--PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 3', 'Beatriz Costa', '456.789.012-00', '(86) 93456-7890', 'beatrizcosta@email.com');
--PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 3', 'Felipe Martins', '567.890.123-45', '(86) 94567-8901', 'felipemartins@email.com');
	
--funcionario loja 4
--PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 4', 'Ricardo Pereira', '789.012.345-67', '(86) 96789-0123', 'ricardopereira@email.com');
--PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 4', 'Tiago Almeida', '901.777.567-99', '(86) 98901-2345', 'tiago.almeida@email.com');
--PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 4', 'Larissa Oliveira', '012.345.678-90', '(86) 99012-3456', 'larissaoliver@email.com');
	
--funcionario loja 5
--PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 5', 'Mariana Rocha', '123.567.000-12', '(86) 91234-5678', 'mariana.rocha@email.com');
--PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 5', 'Sofia Almeida', '456.789.012-67', '(86) 93456-7890', 'sofiaalmeida@email.com');
--PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 5', 'Bruno Oliveira', '567.111.123-45', '(86) 94567-8901', 'brunooliveira@email.com');

PERFORM CADASTRAR('PAGAMENTO','Cartão de Crédito');
PERFORM CADASTRAR('PAGAMENTO','Cartão de Débito');
PERFORM CADASTRAR('PAGAMENTO','Crediário');
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
PERFORM CADASTRAR('ESTOQUE','Camiseta Estampada','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Calça Jeans Skinny','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Calça Jeans Reta','Loja 1',100);
PERFORM CADASTRAR('ESTOQUE','Vestido Midi Floral','Loja 1',100);

--estoque loja 2
PERFORM CADASTRAR('ESTOQUE','Vestido Longo de Festa','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Social Masculino','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Sapato Anabela Feminino','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Bolsa Transversal','Loja 2',100);
PERFORM CADASTRAR('ESTOQUE','Cinto de Couro','Loja 2',100);

--estoque loja 3
--PERFORM CADASTRAR('ESTOQUE','Calça Jeans Skinny','Loja 3',100);
--PERFORM CADASTRAR('ESTOQUE','Sapato Social Masculino','Loja 3',100);
--PERFORM CADASTRAR('ESTOQUE','Cinto de Couro','Loja 3',100);
--PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 3',100);

--estoque loja 4
--PERFORM CADASTRAR('ESTOQUE','Sapato Anabela Feminino','Loja 4',100);
--PERFORM CADASTRAR('ESTOQUE','Vestido Longo de Festa','Loja 4',100);
--PERFORM CADASTRAR('ESTOQUE','Vestido Midi Floral','Loja 4',100);
--PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 4',100);

--estoque loja 5
--PERFORM CADASTRAR('ESTOQUE','Camiseta Básica','Loja 5',100);
--PERFORM CADASTRAR('ESTOQUE','Camiseta Estampada','Loja 5',100);
--PERFORM CADASTRAR('ESTOQUE','Vestido Midi Floral','Loja 5',100);
--PERFORM CADASTRAR('ESTOQUE','Sapato Social Masculino','Loja 5',100);
	END $$;