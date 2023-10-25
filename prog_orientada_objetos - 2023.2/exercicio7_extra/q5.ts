/*5. Crie uma classe chamada Folha de pagamento que no construtor receba um array
de Pessoa e inicialize um atributo do mesmo tipo. Crie um método chamado
calcularPagamentos() que retorna um valor que represente o total de salários dos
elementos do array. Note que você deve considerar o salário apenas de
funcionários e professores.
 */
import { Pessoa } from "./q2";
import { Funcionario } from "./q3";
import { Professor } from "./q4";

class FolhaDePagamento {
    pessoas: Pessoa[] = [];

    constructor(pessoas: Pessoa[]){
        this.pessoas = pessoas;
    }
    
    calcularPagamentos():number {
        let totalSalarios: number = 0;
        for (const pessoa of this.pessoas) {
            if (pessoa instanceof Funcionario) {
                totalSalarios += pessoa.salario;
            } else if (pessoa instanceof Professor) {
                totalSalarios += pessoa.salario;
            }
        } return totalSalarios;
    }
}

let pessoas: Pessoa[] = [new Funcionario('João', 'Silva', '123', 3000), new Professor('Maria', 'Santos', '123', 4000, 'Doutor'), new Funcionario('Leonardo', 'De Almeida', '456', 3500), new Professor('Arlindo', 'Nogueira de Sousa', '456', 5345, 'Mestre')];
let fp: FolhaDePagamento = new FolhaDePagamento(pessoas);

console.log(`Total de Salarios: R$ ${fp.calcularPagamentos().toFixed(2)}`);
