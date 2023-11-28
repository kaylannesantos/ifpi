import { Conta, Poupanca } from "./conta";
import { ContaInexistenteError, PoupancaInvalidaError, AplicacaoError } from "./excecoes";

export class Banco {
    private _contas: Conta[] = []

    get contas():Conta[]{
        return this._contas;
    }

    private existeConta(numero:string): boolean{
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                return true;
            }
        }
        return false;
    }

    consultar(numero: string): Conta{ // questão 08 - se a conta não existir, lançar exceção ContaInexistente
        let contaProcurada!: Conta;

        for (let conta of this.contas){
            if (conta.numero == numero) {
                contaProcurada = conta; 
                break;
            }
        }
        if (!contaProcurada) {
            throw new ContaInexistenteError("Conta inexistente.");
        }
        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {// questão 08 - se a conta não existir, lançar exceção ContaInexistente
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        if (indiceProcurado == -1) {
            throw new ContaInexistenteError('Conta inexistente.');
        }
        return indiceProcurado;
    }

    inserir(conta: Conta): void { //questão 13 - criar validação para caso já exista uma conta com mesmo número - Chamar o consultar. Se a exceção for lançada, incluir conta( consultar a conta dentro do try e incluir conta no catch)
        if (this.existeConta(conta.numero)) {
            throw new AplicacaoError('A conta já existe: ' + conta.numero + '.');
        }
        this.contas.push(conta);
    }

    excluir(numero: string): void {
        let indiceProcurado = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i+1];
            }
            this.contas.pop();
        }
    }

    alterar(conta: Conta): void { // questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        this.contas[indiceProcurado] = conta;
    }

    sacar(numero: string, valor: number): void {// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let indiceProcurado: number = this.consultarPorIndice(numero);
        let conta: Conta = this.contas[indiceProcurado];
        conta.sacar(valor);
    }

    depositar(numero:string, valor:number){// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let conta: Conta = this.consultar(numero)
        conta.depositar(valor);

    }

    transferir(numCredito: string, numDebito: string, valor:number){// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let contaDebito: Conta = this.consultar(numDebito);
        let contaCredito: Conta = this.consultar(numCredito);
        contaDebito.transferir(contaCredito, valor);
    }

    totalContas():number{
        return this.contas.length;
    }

    saldoTotal():number{
        let saldoTotal: number = 0;
        for (let conta of this.contas){
            saldoTotal += conta.saldo;
        }
        return saldoTotal;
    }

    saldoMedia():number{
        let totalContas = this.totalContas();
        let totalSaldo = this.saldoTotal();

        return totalSaldo / totalContas;
    }

    renderJuros(numero:string):void{// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let conta: Conta = this.consultar(numero);

        if (conta instanceof Poupanca) {
            conta.renderJuros();
        }
        throw new PoupancaInvalidaError('Poupança inválida.');
    }

    exibirContas():string{
        let contas: string = '';
        for (let conta of this._contas){
            contas += `Conta: ${conta.numero}, Saldo: ${conta.saldo}\n`
        }
        return contas;
        
    }

    exibirConta(numero:string){
        let contaProcurada = this.consultar(numero);
        if (contaProcurada.numero == numero) {
            return `Conta: ${contaProcurada.numero}, Saldo: ${contaProcurada.saldo}`
        }
    }

}


