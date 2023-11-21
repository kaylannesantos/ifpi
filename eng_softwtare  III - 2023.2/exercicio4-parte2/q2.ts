/*class ValorInvalidoError extends Error {
    message: string
    constructor(message: string){
        super(message);
    }
}*/

class Cliente {
    private _nome: string;
    private _cpf: string;
    private _endereco: string

    constructor(nome: string, cpf: string, endereco: string) {
        this._nome = nome;
        this._cpf = cpf;
        this._endereco = endereco;
    }

    get nome():string{ return this._nome};
    get cpf():string{ return this._cpf};
    get endereco():string{ return this._endereco};
}

class Conta{
    private _cliente: Cliente;
    private _numeroConta: string;
    private _saldo: number;

    constructor(cliente:Cliente, numConta:string, saldo:number) {
        this._cliente = cliente;
        this._numeroConta = numConta;
        this._saldo = saldo;
    }

    get cliente():Cliente{ return this._cliente};
    get numeroConta():string{ return this._numeroConta};
    get saldo():number{ return this._saldo};
    set saldo(saldo:number){this._saldo = saldo};

    depositar(valor:number):void{
        this.saldo += valor; 
    }

    sacar(valor:number):void{
        if (valor > this.saldo) {
            throw Error('Saldo insuficiente!');
        }
        this.saldo -= valor;
    }
}

let cli1: Cliente = new Cliente('Wagner', '000-1', 'Timon - MA')
let cli2: Cliente = new Cliente('Lays', '000-2', 'Timon - MA')
let cli3: Cliente = new Cliente('Ayla', '000-3', 'Primavera, Teresina - MA')

let conta1: Conta = new Conta(cli1, '001', 550);
let conta2: Conta = new Conta(cli2, '002', 200);
let conta3: Conta = new Conta(cli3, '003', 600);

console.log(`Cliente: ${cli1.nome},\nEndereço: ${cli1.endereco},\nConta: ${conta1.numeroConta},`);
console.log('Saldo atual: ', conta1.saldo);
conta1.sacar(600);
console.log('Saldo pós-saque: ', conta1.saldo);



