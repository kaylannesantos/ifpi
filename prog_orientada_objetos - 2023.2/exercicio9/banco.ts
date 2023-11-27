import { Conta, Poupanca } from "./conta";
import { ContaInexistenteError, PoupancaInvalidaError, AplicacaoError } from "./excecoes";

export class Banco {
    private _contas: Conta[] = []

    get contas():Conta[]{
        return this._contas;
    }

    private existeConta(numero:string): boolean{ //OK!
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                return true;
            }
        }
        return false;
    }

    consultar(numero: string): Conta{ //! questão 08 - se a conta não existir, lançar exceção ContaInexistente
        let contaProcurada!: Conta;

        for (let conta of this.contas){
            if (conta.numero == numero) {
                contaProcurada = conta; 
                break;
            }
        }

        try {
            if (!contaProcurada) {
                throw new ContaInexistenteError("Conta inexistente!");
            }
            return contaProcurada;
        } catch (error:any) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message);
            }
        }        
       return contaProcurada;
    }

    consultarPorIndice(numero: string): number {//! questão 08 - se a conta não existir, lançar exceção ContaInexistente
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        try {
            if (indiceProcurado) {
                return indiceProcurado;
            }
            throw new ContaInexistenteError('Conta inexistente!');
        } catch (error:any) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message);
            }
        }
        return indiceProcurado;
    }

    inserir(conta: Conta): void { //! questão 13 - criar validação para caso já exista uma conta com mesmo número - Chamar o consultar, se a exceção for lançada, incluir conta( consultar a conta dentro do try e incluir conta no catch)
        if (this.existeConta(conta.numero)) {
            throw new AplicacaoError('A conta já existe!: ' + conta.numero);
        }
        this.contas.push(conta);
        /* 
        try {
            this.consultar(conta.numero);
            throw new ContaJaCadastradaError('Conta ja cadastrada!');
        } catch (error:any) {
            if (error instanceof ContaInexistenteError) {
                this.contas.push(conta);
            } 
            if (error instanceof ContaJaCadastradaError){
                console.log(error.message);
            }
        }
     
        if (!this.consultar(conta.numero)) {
            this.contas.push(conta);
        }

        if (error instanceof ContaJaCadastradaError) {
            console.log(error.message);
        }
        */
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
        /*
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado] = conta;
        }
        */
    }

    sacar(numero: string, valor: number): void {// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let indiceProcurado: number = this.consultarPorIndice(numero);
        let conta: Conta = this.contas[indiceProcurado];
        conta.sacar(valor);

        /*
        if (indiceProcurado != -1 || indiceProcurado != null) {
            let conta: Conta = this.contas[indiceProcurado];
            conta.sacar(valor);
        }
        */
    }

    depositar(numero:string, valor:number){// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let conta: Conta = this.consultar(numero)
        conta.depositar(valor);

        /*
        if(conta != null){
            conta.depositar(valor);
        }
        */
    }

    transferir(numCredito: string, numDebito: string, valor:number){// questão 09 - remover ifs/elses, pois caso  haja exceção do método consultar estes não sejam executados
        let contaDebito: Conta = this.consultar(numDebito);
        let contaCredito: Conta = this.consultar(numCredito);
        contaDebito.transferir(contaCredito, valor);

        /*
        if(contaCredito != null && contaDebito != null){
            contaDebito.transferir(contaCredito, valor);
        }
        */
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

        /*
        if (conta instanceof Poupanca){
            conta.renderJuros();
        }
        */
    }

}
let b: Banco = new Banco();

b.inserir(new Conta("111", 100));
b.inserir(new Conta('222', 100));
b.renderJuros('222')
console.log(b.saldoTotal());




