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

PERFORM CADASTRAR('Loja 1', '12.345.678/0001-95', 'Rua Aviador, Centro, Teresina (PI), N°6770, CEP 12345-678');
PERFORM CADASTRAR('Loja 2', '12.345.678/0002-86', 'Avenida Benhur Marques, Bairro Árvores Verdes, Altos (PI), N°456, CEP 23456-789');
PERFORM CADASTRAR('Loja 3', '12.345.678/0003-77', 'Rua Isidoro Martins, Bairro Vermelha, Teresina (PI), N°2002, CEP 34567-890');
PERFORM CADASTRAR('Loja 4', '12.345.678/0004-68', 'Alameda Dos Ipês, Bairro Primavera, Teresina (PI), N°602, CEP 45678-901');
PERFORM CADASTRAR('Loja 5', '12.345.678/0005-59', 'Praça Esperança, Bairro Ministro Portela, José De Freitas (PI), N°2770, CEP 56789-012');

--funcionario loja 1
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 1', 'João Silva', '123.456.789-01', '(89) 91234-5678', 'joao.silva@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor', 'Loja 1', 'Maria Oliveira', '234.567.890-12', '(89) 92345-6789', 'maria.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 1', 'Carlos Santos', '345.678.901-23', '(89) 93456-7890', 'carlos.santos@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 1', 'Ana Costa', '456.789.012-34', '(89) 94567-8901', 'ana.costa@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista', 'Loja 1', 'Pedro Lima', '567.890.123-45', '(89) 95678-9012', 'pedro.lima@email.com');
	
--funcionario loja 2
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 2', 'Lucas Almeida', '678.901.234-56', '(89) 96789-0123', 'lucas.almeida@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor', 'Loja 2', 'Fernanda Silva', '789.012.345-67', '(89) 97890-1234', 'fernanda.silva@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 2', 'Roberto Pereira', '890.123.456-78', '(89) 98901-2345', 'roberto.pereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 2', 'Juliana Martins', '901.234.567-89', '(89) 99012-3456', 'juliana.martins@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista', 'Loja 2', 'Thiago Santos', '012.345.678-90', '(89) 90123-4567', 'thiago.santos@email.com');
	
--funcionario loja 3
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 3', 'Juliana Rocha', '234.567.890-12', '(86) 91234-5678', 'juliana.rocha@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor', 'Loja 3', 'Eduardo Lima', '345.678.901-23', '(86) 92345-6789', 'eduardo.lima@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 3', 'Beatriz Costa', '456.789.012-34', '(86) 93456-7890', 'beatriz.costa@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 3', 'Felipe Martins', '567.890.123-45', '(86) 94567-8901', 'felipe.martins@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista', 'Loja 3', 'Aline Silva', '678.901.234-56', '(86) 95678-9012', 'aline.silva@email.com');
	
--funcionario loja 4
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 4', 'Ricardo Pereira', '789.012.345-67', '(86) 96789-0123', 'ricardo.pereira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor', 'Loja 4', 'Camila Santos', '890.123.456-78', '(86) 97890-1234', 'camila.santos@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 4', 'Tiago Almeida', '901.234.567-89', '(86) 98901-2345', 'tiago.almeida@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 4', 'Larissa Oliveira', '012.345.678-90', '(86) 99012-3456', 'larissa.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista', 'Loja 4', 'Gustavo Costa', '123.456.789-01', '(86) 90123-4567', 'gustavo.costa@email.com');
	
--funcionario loja 5
PERFORM CADASTRAR('FUNCIONARIO','Gerente', 'Loja 5', 'Mariana Rocha', '234.567.890-12', '(86) 91234-5678', 'mariana.rocha@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Supervisor', 'Loja 5', 'Pedro Lima', '345.678.901-23', '(86) 92345-6789', 'pedro.lima@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Vendedor', 'Loja 5', 'Sofia Almeida', '456.789.012-34', '(86) 93456-7890', 'sofia.almeida@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Operador de Caixa', 'Loja 5', 'Bruno Oliveira', '567.890.123-45', '(86) 94567-8901', 'bruno.oliveira@email.com');
PERFORM CADASTRAR('FUNCIONARIO','Estoquista', 'Loja 5', 'Raquel Santos', '678.901.234-56', '(86) 95678-9012', 'raquel.santos@email.com');


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