/*5. Suponha um sistema de controle de estoque de produtos e implemente:
a. Duas classes: Produto e ProdutoPerecivel;
b. A classe Produto tem atributos privados representando identificador,
descrição, quantidade de produtos em estoque e valor unitário;
c. ProdutoPerecivel tem as mesmas características de Produto, porém possui
a mais um atributo representando a data da validade
(https://www.javatpoint.com/typescript-date-object). Use herança;
d. Produto possui dois métodos para repor e dar baixa. A e ambos somam e
subtraem respectivamente uma quatidade passada por parâmetro do
atributo quantidade;
e. Um produto perecível possui um método que diz se um produto está válido
ou não comparando sua data de validade com a data atual;
f. Use sobrescrita, ou seja, reescreva os métodos de inserir, repor e dar baixa
para que não seja possível executar a ação caso o produto não esteja na
validade;
g. Crie uma classe chamada Estoque que possui um atributo privado
representando um array de produtos (Produto ou ProdutoPerecivel);
h. Implemente métodos para inserir, consultar pelo atributo id, excluir, repor e
dar baixa nos produtos na classe estoque;
i. Crie validações para não deixar serem incluídos produtos com mesmo id ou
mesmo nome;
j. Os métodos repor e dar baixa na classe estoque chamam os métodos da
classe produto finalmente alterar a quantidade;
k. Os vários métodos da classe devem levar em conta se o produto existe,
para isso, use o método consultar. Caso precise, crie métodos de consulta
auxiliares;
l. Implemente um método que liste todos os produtos perecíveis vencidos. */