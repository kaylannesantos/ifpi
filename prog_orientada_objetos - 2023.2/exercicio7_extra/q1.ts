/*1. Dadas as três classes abaixo:
class Empregado {
salario: number = 500;
calcularSalario(): number { ...}
}
class Diarista extends Empregado {
 calcularSalario(): number { ...}
}
class Horista extends Diarista {
calcularSalario(): number { ...}
}
Implemente os métodos calcularSalario() de cada classe da seguinte forma:
a. Empregado: apenas retorna o valor do atributo salário;
b. Diarista: sobrescreve calcularSalario, chamando o método homônimo de
Empregado e dividindo o resultado por 30;
c. Horista: sobrescreve calcularSalario, chamando o método homônimo de
Diarista e dividindo o resultado por 24.
 */

class Empregado {
    salario: number = 500;

    calcularSalario():number {
        return this.salario;
    }
}

class Diarista extends Empregado {
    calcularSalario(): number {
        return super.calcularSalario() / 30;
    }

}

class Horista extends Diarista {
    calcularSalario(): number {
        return super.calcularSalario() / 24;
    }
}

let empregado: Empregado = new Empregado;
let diarista: Diarista = new Diarista;
let horista: Horista = new Horista;


console.log(empregado.calcularSalario().toFixed(2));
console.log(diarista.calcularSalario().toFixed(2));
console.log(horista.calcularSalario().toFixed(2));


