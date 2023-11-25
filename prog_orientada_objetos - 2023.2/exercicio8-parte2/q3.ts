/*3) Implemente como nos slides o lançamento da exceção no método sacar e realize
um teste para saques que deixariam o saldo negativo. 

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldoInicial: number) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }

    get numero():string{
        return this._numero;
    }
    get saldo() {
        return this._saldo;
    }
    set saldo(valor:number){
        this._saldo = valor;
    }

    sacar(valor: number): void {
        if (this.saldo < valor) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
    }
}
let c1: Conta = new Conta("1", 0.0);
let c2: Conta = new Conta("2", 10.50);
let c3: Conta = new Conta("3", 20);

c1.sacar(200);
console.log('Conta 1: ', c1.saldo);
c2.sacar(3.50);
console.log('Conta 2: ', c2.saldo);
c3.sacar(2);
console.log('Conta 3: ', c3.saldo);

*/