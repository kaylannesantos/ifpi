/*5. Crie uma classe chamada Folha de pagamento que no construtor receba um array
de Pessoa e inicialize um atributo do mesmo tipo. Crie um método chamado
calcularPagamentos() que retorna um valor que represente o total de salários dos
elementos do array. Note que você deve considerar o salário apenas de
funcionários e professores.
 */

import { Pessoa } from "./q2";

class FolhaPagamento {
    pessoas: Pessoa[];

    constructor(pessoas: Pessoa[]) {
        this.pessoas = pessoas;
    }
}