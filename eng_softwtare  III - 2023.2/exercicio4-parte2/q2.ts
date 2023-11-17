class Cliente{
    private _nome: string;
    private _cpf: string;
    private _endereco: string;

    constructor(nome: string, cpf: string, endereco: string) {
        this._nome = nome;
        this._cpf = cpf;
        this._endereco = endereco;
    }

    get nome():string{return this._nome};
    get cpf():string{return this._cpf};
    get endereco():string{return this._endereco};
}

class Conta {
    private _saldo : number;
    private _numeroConta: string;
    private _cliente: Cliente;
    
    constructor(saldo: number, numConta:string, cliente: Cliente) {
        this._saldo = saldo;
        this._numeroConta = numConta;
        this._cliente = cliente;
    }

    get saldo():number{return this._saldo;};
    set saldo(valor: number){this.saldo = valor};

    get numeroConta():string{return this._numeroConta;}

    get cliente():Cliente{return this._cliente};

    depositar(valor: number):void{
        this.saldo += valor;
    }

    sacar(valor: number):void{
        if (valor > this.saldo){
            throw new Error("Saldo insuficiente!")
        }
        this.saldo -= valor;
    }
}