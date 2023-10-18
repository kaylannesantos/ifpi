/*4. Uma subclasse de Funcionario, chamada Professor tendo:
a. Um atributo _titulacao (string) com seus métodos de leitura
b. Todo professor recebe seu salário em uma única parcela. Assim, deve-se
sobrescrever os métodos calcularSalarioPrimeiraParcela e
calcularSalarioSegundaParcela. O método calcularSalarioPrimeiraParcela
da classe Professor deve retornar o valor integral do salário do professor e
o método calcularSalarioSegundaParcela do professor deve retornar o valor
zero.
 */

import { Funcionario } from "./q3";

class Professor extends Funcionario {
    constructor(nome: string, sobrenome: string, matricula: string, salario: number,private _titulacao: string) {
        super(nome, sobrenome, matricula, salario);
        this._titulacao = _titulacao;
    }

    calcularSalarioPrimeiraParcela(): number | null {
        return this.salario;
    }

    calcularSalarioSegundaParcela(): number | null {
        return 0;
    }
}

let professor: Professor = new Professor('Maysa', 'De Sousa', '2023111', 900, 'Mestre');

console.log(professor.calcularSalarioPrimeiraParcela());
