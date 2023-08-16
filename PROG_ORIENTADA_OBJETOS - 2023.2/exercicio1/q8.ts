/*8. Crie uma classe Circulo que possua um atributo raio. Crie dois métodos que
calculam a área e o perímetro. Instancie um objeto dessa classe, atribua um valor
ao raio e exiba a área e o perímetro chamando os dois métodos definidos.*/

class Circulo {
    raio: number;

    constructor(raio: number) {
        this.raio = raio;
    }

    calcularArea() {
        return 3.14  * (this.raio ^2);
    }

    calcularPerimetro() {
        return 2 * 3.14 * this.raio;
    }

}

const circulo = new Circulo(10);

console.log(circulo.calcularArea());
console.log(circulo.calcularPerimetro());

