/*4. Considerando a implementação da aplicação bancária, implemente:
a. Implemente na classe Banco o método renderJuros(numero: string):
number, onde:
i. É passado por parâmetro o número de uma poupança e feita uma
consulta para ver se a conta existe. Note que a consulta não se
altera sendo Conta ou Poupança;
ii. Caso a poupança seja encontrada, teste se realmente se trata de
uma poupança com o operador instanceof, desconsidere a
operação caso contrário;
iii. Caso seja, faça um cast e invoque o método renderJuros da própria
instância encontrada;
iv. Teste o método da classe Banco passando tanto um número de
poupança como de conta passados inseridos anteriormente;
v. Altere a aplicação anteriormente sugerida para ter a opção de menu
“Render Juros”.
b. Adicione a aplicação para também permitir o cadastro da ContaImposto
feita em sala de aula;
c. Incremente a implementação da aplicação para recuperar de um arquivo
texto para o array contas salvas em um arquivo contas.txt com um formato
semelhante ao abaixo:
111-1; 40; C
222-2; 10.65, CP; 0.5
333-3; 2.00; CI; 0.38
444-4; 140; CP; 0.5
Onde os campos separados por ponto-e-vírgula são o número, o saldo, o
tipo da conta e, no caso de conta imposto e conta poupança, a taxa de
desconto e taxa de juros.
Pesquise uma biblioteca de leitura e escrita de arquivos e deixe essa e a
próxima opção disponíveis para o usuário escolher
d. Implemente também uma funcionalidade de gravar no mesmo arquivo o
conteúdo do array de contas*/

