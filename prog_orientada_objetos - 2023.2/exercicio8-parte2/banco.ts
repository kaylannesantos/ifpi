import { Conta, Poupanca } from "./conta";
import { ContaInexistenteError, PoupancaInvalidaError } from "./excecoes";

export class Banco {
    private _contas: Conta[] = []

    get contas():Conta[]{
        return this._contas;
    }

    consultar(numero: string): Conta{ // Incompleta !!!
        let contaProcurada!: Conta;

        try {
            for (let conta of this.contas){
                if (conta.numero == numero) {
                    contaProcurada = conta;
                    break;
                }
            }
            if (contaProcurada) {
                return contaProcurada;
            }
            throw new ContaInexistenteError("Conta inexistente!");
        } catch (error:any) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message);
            }
        }
        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    }

    inserir(conta: Conta): void {
        if (!this.consultar(conta.numero)) {
            this.contas.push(conta);
        }
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

    alterar(conta: Conta): void {
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado] = conta;
        }
    }

    sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        if (indiceProcurado != -1 || indiceProcurado != null) {
            let conta: Conta = this.contas[indiceProcurado];
            conta.sacar(valor);
        }
    }

    depositar(numero:string, valor:number){
        let conta: Conta = this.consultar(numero)
        if(conta != null){
            conta.depositar(valor);
        }
    }

    transferir(numCredito: string, numDebito: string, valor:number){
        let contaDebito: Conta = this.consultar(numDebito);
        let contaCredito: Conta = this.consultar(numCredito);

        if(contaCredito != null && contaDebito != null){
            contaDebito.transferir(contaCredito, valor);
        }
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

    renderJuros(num:string):void{
        let conta: Conta = this.consultar(num);

        try { // questão 12 - cria-se a exceção PoupancaInvalidaError para que, caso a conta não seja poupança, a exceção seja lançada
            if (conta instanceof Poupanca) {
                conta.renderJuros();
            }
            throw new PoupancaInvalidaError('Poupança inválida!');
        } catch (error:any) {
            if (error instanceof PoupancaInvalidaError) {
                console.log(error.message);
            }
        }

        if (conta instanceof Poupanca){
            conta.renderJuros();
        }
    }

}
let b: Banco = new Banco();

b.inserir(new Conta("111", 100));
b.inserir(new Conta("222", 100));

//b.sacar('111',150);

console.log(b.consultar('333'));

