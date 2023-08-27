"use strict";
/*6. Crie uma função exibir receba como parâmetro um “rest parameter” representando
strings. A função deve exibir no log cada um dos elementos do “rest parameter”.
Chame a função usando diferentes quantidade de parâmetros conforme abaixo:
exibir(“a”, “b”);
exibir(“a”, “b”, “c”);
exibir(“a”, “b”, “c”, “d”); */
function alfabeto(...letters) {
    let soletrar = '';
    for (let letter of letters)
        soletrar += letter;
    return soletrar;
}
console.log(alfabeto("a ", "b "));
console.log(alfabeto("a ", "b ", "c "));
console.log(alfabeto("a ", "b ", "c ", "d "));
