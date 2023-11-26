import { AplicacaoError, SaldoInsuficienteError, ValorInvalidoError } from "./excecoes";

export class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldo: number) {// questao 10 criar uma exceção ValorInvalidoError para valores menor que zero
        if (saldo < 0) {
            throw new ValorInvalidoError("Valor inválido!");
        }
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

    private validarValor(valor:number):number{ //questao 11 - cria-se um método de validação de valor, caso ele seja <= 0 seja lançada uma exceção
        try {
            if (valor <= 0) {
                throw new ValorInvalidoError('Valor inválido!');
            }
            return valor;
        } catch (error:any) {
            if (error instanceof ValorInvalidoError) {
                console.log(error.message);
            }
        }
        return valor;
    }
    
    depositar(valor: number): void {//questão 06 lançar exceções em sacar e depositar
        this.validarValor(valor); // q11 chamar método validarValor
        this.saldo += valor;

        /*
        try {
            if (valor < 0 ) {
                throw new ValorInvalidoError("Valor inválido!");// questao 10 criar uma exceção ValorInvalidoError para valores menor que zero
            }
            this.saldo += valor;
        } catch (error:any) {
            if (error instanceof ValorInvalidoError) {
                console.log(error.message);
            }
        }
        */
    }

    sacar(valor: number): void {//questão 06 lançar exceções em sacar e depositar
        this.validarValor(valor);// q11 chamar método validarValor
        this.saldo -= valor;

        /*
        try {
            if (this.saldo < valor) {
                throw new ValorInvalidoError("Saldo insuficiente!"); // questao 10 criar uma exceção ValorInvalidoError para valores menor que zero
            }
            this.saldo -= valor;
        } catch (error:any) {
            if (error instanceof ValorInvalidoError) {
                console.log(error.message)
            }
        }
        */

    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor); 
    }
}

export class Poupanca extends Conta{
    private _taxajuros: number;
    constructor(numero: string, saldo:number, txJuros:number) {
        super(numero,saldo);
        this._taxajuros = txJuros;
    }

    get taxaJuros():number{
        return this._taxajuros;
    }
    renderJuros():void{
        this.depositar(this.saldo * (this.taxaJuros/100))
    }
}

export class ContaImposto extends Conta {
    private _taxaDesconto: number;

    constructor(numero: string, saldo: number, txDesconto: number) {
        super(numero, saldo);
        this._taxaDesconto = txDesconto;
    }

    get taxaDesconto():number{
        return this._taxaDesconto;
    }

    debitar(valor: number):void{
        let valorTotal = valor + (valor * (this.taxaDesconto / 100));
        super.sacar(valorTotal);
    }
}


try {
    let c1: Conta = new Conta("1", 100);
    let c2: Conta = new Conta("2", 200);
    c1.sacar(1);
    console.log(c1.consultarSaldo());
} catch (error:any) {
    if (error instanceof ValorInvalidoError) {
        console.log(error.message);
    }
}
