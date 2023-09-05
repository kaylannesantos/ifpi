/*5. Considerando o uso da classe Conta apresentada em aula e seu uso abaixo:
let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;
c1 = c2;
c3 = c1;
c1.sacar(10);
c1.transferir(c2,50);
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());

a. Qual o resultado dos dois "prints"? Justifique sua resposta.
R-> Ambos apresentam como resultado o mesmo valor, pois ambos apontam para o mesmo objeto.
b. O que acontece com o objeto para o qual a referência c1 apontava?
R-> Ele é mantido, só que agora ele aponta para o mesmo objeto em que os demais estão apontando. 
Dessa forma, quando c1 transferi 50 para c2, na verdade ele esta incrementando e decrementando o mesmo objeto. 
*/

class Conta {
    numero: String;
    saldo: number;

    constructor(numero: String, saldo: number) {
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }
    
    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}

let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;
c1 = c2;
c3 = c1;
c1.sacar(30);
c1.transferir(c2,50);
console.log(c1.consultarSaldo());//90
console.log(c2.consultarSaldo());//90
console.log(c3.consultarSaldo());//90
