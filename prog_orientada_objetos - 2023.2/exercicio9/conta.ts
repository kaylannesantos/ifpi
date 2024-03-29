import { ValorInvalidoError, SaldoInsuficienteError } from "./excecoes";

export class Conta {
    private _numero: string;
    private _saldo: number = 0;

    constructor(numero: string, saldo: number) {
        this._numero = numero;       
        this.depositar(saldo);// questao 10 - alterar o construtor para que o saldo inicial seja atribuído com o método depositar
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

    private validarValor(valor:number):number{ //Refatorado: questao 11 - cria-se um método de validação de valor, caso ele seja menor ou igual a 0 seja lançada uma exceção 
        if (valor <= 0) { 
            throw new ValorInvalidoError('Valor inválido, tente novamente.'); // questao 10 criar uma exceção ValorInvalidoError para valores menor que zero
        }
        return valor;
    }

    depositar(valor: number): void {//questão 06 lançar exceções em sacar e depositar
        if (this.saldo != 0) {
            this.validarValor(valor); //refatorado:  questão 11 - chamar método validarValor
        }
        this.saldo += valor;
    }

    //questão 03 - implementar como nos slides o lançamento da exceção no método sacar
    sacar(valor: number): void {//questão 06 lançar exceções em sacar e depositar
        this.validarValor(valor); //Refatorado: questão 11 - chamar método validarValor
        if (this.saldo < valor) {
            throw new SaldoInsuficienteError("Saldo insuficiente."); 
        }
        this.saldo -= valor;
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
        this.depositar(this.saldo * (this.taxaJuros/100));
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
