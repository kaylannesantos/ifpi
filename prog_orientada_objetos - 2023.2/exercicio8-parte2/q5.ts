/*5) Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco.
Chame o método transferir novamente passando um valor que lance a exceção na
classe conta. Você considera que o lançamento da exceção foi “propagado” para o
método conta.transferir(), banco.transferir() e o método transferir do script app?
Como você avalia a confiabilidade dessa implementação.
-> A partir da implementação da exceção em 'transferir' da classe conta, o tratamento se estende para as classes que chamam esse método. Isso garante que o tratamento aplicado se estende desde a camada mais baixa até a camada mais alta de uma aplicação */