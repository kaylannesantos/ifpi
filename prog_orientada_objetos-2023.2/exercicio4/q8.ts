/*8. Uma classe Equipamento com:
a. um atributo ligado (tipo boolean)
b. dois métodos liga() e desliga(). O método liga torna o atributo ligado true e
o método desliga torna o atributo ligado false.
c. Crie um método chamado inverte(), que muda o status atual (se ligado,
desliga...se desligado, liga)
d. Crie um método que estaLigado() que retorna o valor do atributo ligado
e. Altere o comportamento dos métodos liga para caso o equipamento já
esteja ligado, não ligue novamente. Faça o mesmo com o método desligar.
f. Instancie uma classe Equipamento e teste todos os seus métodos.
*/

class Equipamento {
    ligado: boolean;

    constructor(ligado: boolean) {
        this.ligado = ligado;
    }

    liga ():boolean {
        if (this.ligado == false) {
            return this.ligado = true ;
        }
        return this.ligado;       
    }

    desliga (): boolean {
        if (this.ligado == true) {
        return this.ligado = false;
        }
        return this.ligado;
    }

    inverte (): boolean {
        if (this.ligado == true) {
            return this.desliga(); 
        }
        return this.liga();
    }

    estaLigado ():boolean {
        return this.ligado;
    }

}

let e1:  Equipamento = new Equipamento(false);
let e2:  Equipamento = new Equipamento(true);

e1.liga;
console.log(` e1 esta ligado? ` + e1.estaLigado());
e2.desliga;
console.log(`e2 esta ligado? ` + e2.estaLigado());
