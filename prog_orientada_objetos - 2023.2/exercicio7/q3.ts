/*3. Crie uma classe chamada CalculadoraCientifica que herda da classe Calculadora
do exercício passado e:
a. Implemente um método chamado exponenciar que retorne o primeiro
operando elevado ao segundo;
b. Teste a classe;
c. Foi necessária alguma modificação em Calculadora para o acesso aos
atributos?
*/
import { Calculadora } from "./q2";

class CalculadoraCientifica extends Calculadora{
    constructor(operator1: number, operator2: number) {
        super(operator1, operator2);
    }

    exponenciar(): number { //foi preciso criar métodos de leitura para os atributos privados
        return this.operator1 ** (this.operator2);
    }
}

let cc1: CalculadoraCientifica = new CalculadoraCientifica(12,2);

console.log('Result: ', cc1.exponenciar());
