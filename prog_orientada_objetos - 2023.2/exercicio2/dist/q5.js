"use strict";
/*5. Pesquise e, se encontrar, um exemplo onde o tipo any seria benéfico. */
var dadosCliente = {
    nome: "Alice",
    idade: 30,
    cpf: '098.876.000-00',
    contas: {
        c1: '0000',
        c2: '1111'
    }
};
function logClientes(dados) {
    console.log("Nome: ".concat(dados.nome));
    console.log(typeof (dados.nome));
    console.log("Idade: ".concat(dados.idade));
    console.log(typeof (dados.idade));
    console.log("CPF: ".concat(dados.cpf));
    console.log(typeof (dados.cpf));
    console.log("Contas: ".concat(dados.contas.c1, ", ").concat(dados.contas.c2));
}
logClientes(dadosCliente);
