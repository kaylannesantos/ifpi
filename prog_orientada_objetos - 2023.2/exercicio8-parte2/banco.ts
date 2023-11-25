import { Conta } from "./conta";

class Banco {
    contas: Conta[] = []

    consultar(numero: string): Conta{
        let contaProcurada!: Conta;

        for (let conta of this.contas){
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;

        /*for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                contaProcurada = this.contas[i];
                break;
            }
        }
        return contaProcurada;*/
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

    transferir(numContaOrigem: string, numContaDestino: string, valor:number){//numeroCredito:string, numeroDebito:string
        //let contaCredito: Conta = this.consultar(numeroCredito);
        //let contaDebito: Conta = this.consultar(numeroDebito);
        let contaOrigem: Conta = this.consultar(numContaOrigem);
        let contaDestino: Conta = this.consultar(numContaDestino);

        if(contaOrigem != null && contaDestino != null){
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    totalContas():number{
        return this.contas.length;
    }

    valorTotal():number{
        let saldoTotal: number = 0;
        for (let conta of this.contas){
            saldoTotal += conta.saldo;
        }
        return saldoTotal;
    }

}
let b: Banco = new Banco();

b.inserir(new Conta("111", 100));
b.inserir(new Conta("222", 100));

export { Banco };