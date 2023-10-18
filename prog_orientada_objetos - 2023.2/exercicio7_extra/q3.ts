/*3. Crie uma subclasse de Pessoa, chamada Funcionario que deve possuir:
a. Os atributos privados _matricula do tipo string e _salario do tipo number,
com seus respectivos métodos para leitura.
b. O salário de um funcionário jamais poderá ser negativo. Todo funcionário
recebe seu salário em duas parcelas, sendo 60% na primeira parcela e
40% na segunda parcela. Assim, escreva os métodos
calcularSalarioPrimeiraParcela que retornam o valor da primeira parcela do
salário (60%) e calcularSalarioSegundaParcela que retorna o valor da
segunda parcela do salário (40%). */

import { Pessoa } from "./q2";

class Funcionario extends Pessoa {
    
        constructor(nome: string, sobrenome: string, private _matricula: string, private _salario: number) {
        super(nome, sobrenome);
        this._matricula = _matricula;
        this._salario = _salario;
    }

    get matricula():string {
        return this._matricula
    }

    get salario():number {
        return this._salario;
    }

    calcularSalarioPrimeiraParcela(): number|null { //primeira parcela do salário (60%)
        if (this.salario > 0) {
            return this.salario + (this.salario * (60/100))
        }
        return null;
    }

    calcularSalarioSegundaParcela(): number|null { //segunda parcela do salário (40%)
        if (this.salario > 0) {
            return this.salario + (this.salario * (40/100))
        }
        return null;
    }
}

//let funcionario: Funcionario = new Funcionario('Maysa', 'De Sousa', '2023111', 900);
//console.log(funcionario.calcularSalarioPrimeiraParcela());
//console.log(funcionario.calcularSalarioSegundaParcela());

export { Funcionario };