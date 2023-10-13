/*3. Crie uma classe chamada CalculadoraCientifica que herda da classe Calculadora
do exercício passado e:
a. Implemente um método chamado exponenciar que retorne o primeiro
operando elevado ao segundo;
b. Teste a classe;
c. Foi necessária alguma modificação em Calculadora para o acesso aos
atributos?
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

class CalculadoraCientifica extends Calculadora{
    constructor(operator1: number, operator2: number) {
        super(operator1, operator2);
    }

    exponeciar(): number {
        return this.operator1 ** (this.operator2);
    }
}

let cc1: CalculadoraCientifica = new CalculadoraCientifica(12,2);

console.log('Result: ', cc1.exponeciar());
