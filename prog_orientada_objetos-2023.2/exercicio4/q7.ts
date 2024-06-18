/*7. Crie uma classe chamada Triangulo que:
• Possua 3 atributos inteiros representando os lados;
• Crie um método que retorna true se os lados formarem um triângulo de
acordo com a regra: |b-c| < a < b+c;
• Crie 3 métodos: ehIsoceles(), ehEquilatero() e ehEscaleto() que retorne
verdadeiro caso o triângulo seja um dos tipos relacionados ao nome do
método. Eles devem chamar antes de tudo, o método da questão b. e
retornar false se esse método já retornar false também;
• Instancie classes Triangulo de diferentes lados e seus métodos.

*/

class Triangulo {
    a: number;
    b: number;
    c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    ehTriangulo (): boolean {
        if ((this.b - this.c) < this.a && this.a < (this.b + this.c)) {
            if ((this.b - this.a) < this.c && (this.c - this.a) < this.b) {
                return true;
            }
        }
        return false;
    }

    ehIsoceles (): boolean {
        if (this.ehTriangulo() == true) {
            if ( this.a == this.b || this.a == this.c) {
                return true;
            }
        }
        return false;
    }

    ehEquilatero (): boolean {
        if (this.ehTriangulo() == true) {
            if (this.a == this.b && this.a == this.c) {
                if (this.b == this.a && this.b == this.c) {
                    if (this.c == this.a && this.c == this.b) {
                        return true;
                    }
                }
            }
            
        }
        return false;
    }

    ehEscaleno (): boolean {
        if (this.ehTriangulo() == true) {
            if (this.a != this.b && this.a != this.c) {
                if (this.b != this.a && this.b != this.c) {
                    if (this.c != this.a && this.c != this.b) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

}

let t1 : Triangulo = new Triangulo(3,4,5);

console.log(`É tringulo? ${t1.ehTriangulo()}`);
console.log(`É isóceles? ${t1.ehIsoceles()}`); //4,4,6
console.log(`É equilatero? ${t1.ehEquilatero()}`); // 5,5,5
console.log(`É equilatero? ${t1.ehEscaleno()}`); // 3,4,5

