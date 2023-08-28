/*9. Crie um exemplo usando a função map para dobrar os elementos de um array e
reduce para totalizar a soma dos elementos do array. */

function mapReduce (numeros: number[]) {
    //map
    let dobraNumero = numeros.map(num => num * 2);
    console.log(dobraNumero);//log opcional
    //reduce
    let somaNumero = dobraNumero.reduce((acumulador, numero) => acumulador + numero);
    return somaNumero;
}

console.log(mapReduce([1,2,3,4,5]))
