/*
9. Altere a classe conta dos slides conforme as instruções abaixo:
• Altere o método sacar de forma que ele retorne verdadeiro ou falso. Caso o
saque deixe saldo negativo, o mesmo não será realizado, retornando falso;
• Altere o método transferir() para que retorne também um valor lógico e que
não seja feita a transferência caso o sacar() na conta origem não seja
satisfeito;
• Verifique as diferentes operações implementadas.
*/

class Conta {
    numero: String;
    saldo: number;

    constructor(numero: String, saldo: number) {
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): boolean { //método alterado
        if (this.saldo - valor < 0) {
            return false;
        }
        this.saldo = this.saldo - valor;
        return true;
    }
    
    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): boolean { //método alterado
        if (this.saldo - valor < 0) {
            return false;
        }
        this.sacar(valor);
        contaDestino.depositar(valor);
        return true;
    }
}

let c1 = new Conta("1", 1000);
let c2 : Conta = new Conta("2", 200);

console.log(c1.sacar(200));
console.log(c1.consultarSaldo());
console.log(c1.transferir(c2,50));

console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
