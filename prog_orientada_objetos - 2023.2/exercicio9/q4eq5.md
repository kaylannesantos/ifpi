4. Crie duas contas e teste o método transferir de modo que a conta a ser debitada
não possua saldo suficiente. Explique o que ocorreu.
- Ao lancar uma exceção no método sacar e fazer uma transferência da conta debito para crédito o saldo não é suficiente
e com a exceção a operação é abortada.

```typescript
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
        try {
            if (this.saldo < valor) {
                throw new SaldoInsuficienteError("Saldo insuficiente!");
            }
            this.saldo -= valor;
        } catch (error:any) {
            if (error instanceof SaldoInsuficienteError) {
                console.log(error.message)
            }
        }
    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}

let c1: Conta = new Conta("1", 100);
let c2: Conta = new Conta("2", 200);
c1.transferir(c2,150 ) // Error: Saldo insuficiente!
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
```
5. Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco.
Chame o método transferir novamente passando um valor que lance a exceção na
classe conta. Você considera que o lançamento da exceção foi “propagado” para o
método conta.transferir(), banco.transferir() e o método transferir do script app?
Como você avalia a confiabilidade dessa implementação.
- A partir da implementação da exceção em 'transferir' da classe conta, o tratamento se estende para as classes que chamam esse método. Isso garante que o tratamento aplicado se estenda desde a camada mais baixa até a camada mais alta da aplicação