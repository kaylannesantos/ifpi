/*1. Crie uma classe Calculadora que tenha:
a. Dois atributos privados (operando1 e 2) do tipo number;
b. Dois métodos públicos, cada um representando uma operação básica;
c. Um construtor onde são passados os operandos e que esses inicializam os
atributos;
Teste a classe calculadora e seus métodos. Tente acessar os atributos
diretamente e verifique o que acontece*/

class Calculadora {
    private _operando1: number;
    private _operando2: number;

    constructor(_operando1: number, _operando2: number) {
        this._operando1 = _operando1;
        this._operando2 = _operando2;
    }

    soma ():number {
        return this._operando1 + this._operando2;
    }

    subtracao ():number {
        return this._operando1 - this._operando2;
    }
}

let calculo1: Calculadora = new Calculadora(10,3);
//calculo1._operando1; //* ele não deixa acessar o atributo, já que este está privado

console.log(`Resuldado: 
soma: ${calculo1.soma()}
subtração: ${calculo1.subtracao()}`);





