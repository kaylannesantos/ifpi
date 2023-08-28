"use strict";
/*Crie uma função que recebe como parâmetro um número e retorna true se o
número for par e false se for ímpar. */
function ehImparPar(numero) {
    if (numero % 2 == 0) {
        return true;
    }
    return false;
}
console.log(ehImparPar(4));
