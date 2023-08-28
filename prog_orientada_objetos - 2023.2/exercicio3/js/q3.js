"use strict";
/*3. Crie uma função que receba como parâmetros um nome e um pronome de
tratamento opcional. Caso esse último não seja fornecido, deve ser considerado o
valor “Sr”. Ao final, imprima uma saudação semelhante a “Sra. Sávia”. */
function saudacao(nome, pronome) {
    if (pronome) {
        return nome + " " + pronome;
    }
    return nome;
}
console.log(saudacao('Alice', 'Senhorita')); //"Alice Senhorita" 
console.log(saudacao('Alice')); //"Alice"
