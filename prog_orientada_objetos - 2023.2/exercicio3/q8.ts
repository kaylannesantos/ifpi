/*8. Dado método filter dos arrays, crie uma implementação usando arrow function que
filtre todos os elementos pares do array abaixo:
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; */

function filterPar (num: number[]) {
    let numPares = num.filter(n1 => n1 % 2 == 0 )
    return numPares
}

console.log(filterPar([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
