/*9. Crie um exemplo usando a função map para dobrar os elementos de um array e
reduce para totalizar a soma dos elementos do array. */

function map (numeros: number[]) {
    let dobraNumero = numeros.map(num => num * 2);
    console.log(dobraNumero);//log opcional
    let somaNumero = dobraNumero.reduce((acumulador, numero) => acumulador + numero);
    return somaNumero;
}
console.log(map([1,2,3,4,5]))
