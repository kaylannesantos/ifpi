/*4) Crie duas contas e teste o método transferir de modo que a conta a ser debitada
não possua saldo suficiente. Explique o que ocorreu */
import { AplicacaoError, SaldoInsuficienteError } from "./excecoes";

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldo: number) {
        this._numero = numero;
        this._saldo = saldo;
    }

    get numero():string{
        return this._numero;
    }
    get saldo():number{
        return this._saldo;
    }
    set saldo(newSaldo: number){
        this._saldo = newSaldo;
    }

    consultarSaldo(): number {
        return this.saldo;
    }
    
    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): void {
        if (this.saldo < valor) {
            throw new SaldoInsuficienteError("Saldo insuficiente!");
        }
        this.saldo -= valor;
    }

    transferir(contaDestino: Conta, valor: number): void {
        try {
            this.sacar(valor);
            contaDestino.depositar(valor); 
        } catch (error:any) {
            console.error(error.message)
        }

    }
}

let c1: Conta = new Conta("1", 100);
let c2: Conta = new Conta("2", 200);
c1.transferir(c2,150 ) // Error: Saldo insuficiente!
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());

/* Ao lancar uma exceção no método sacar e fazer uma transferência da conta debito para crédito o saldo não é suficiente
e com a exceção a operação é abortada */
