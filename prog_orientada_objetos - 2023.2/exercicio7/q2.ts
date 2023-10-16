/*2. Crie uma classe Calculadora com:
a. Dois tributos privados chamados representando dois operandos;
b. Crie um construtor que inicializa os atributos;
c. Crie um método que retorna a soma dos dois atributos;
d. Teste a classe.
*/

class Calculadora {
   
    constructor(private _operator1: number, private _operator2: number) {
        this._operator1 = _operator1;
        this._operator2 = _operator2;
    }

    get operator1(): number {
        return this._operator1;
    }

    get operator2(): number {
        return this._operator2;
    }

    sum():number {
        return this.operator1 + this.operator2;
    }
}

//let c1: Calculadora = new Calculadora(10,3);
//let c2: Calculadora = new Calculadora(12,5);

//console.log('\nFirst result: ', c1.sum()); 13
//console.log('Second result: ', c2.sum()); 17

export { Calculadora };