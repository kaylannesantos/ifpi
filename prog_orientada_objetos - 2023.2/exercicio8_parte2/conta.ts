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
        if (this.saldo >= valor) {
            this.saldo -= valor;
        }
    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}
/*
let c1: Conta = new Conta("1", 100);
let c2: Conta = new Conta("2", 200);
c1.transferir(c2,50 )
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
*/



export { Conta };