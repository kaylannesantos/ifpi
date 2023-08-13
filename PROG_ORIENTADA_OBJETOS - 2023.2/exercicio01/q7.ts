/*7. Considerando o exemplo da classe Retangulo dos slides, implemente um método
adicional chamado que calcule o perímetro do retângulo e altere a classe
TestaRetangulo para exibir o cálculo do perímetro. */

class Retangulo {
    l1: number;
    l2: number;
  
    constructor(l1: number, l2: number) {
      this.l1 = l1;
      this.l2 = l2;
    }
  
    calcularArea() {
      return this.l1 * this.l2;
    }
  
    calcularPerimetro() {
      return 2 * (this.l1 + this.l2);
    }
    
  }
  
  const retangulo = new Retangulo(12,3);
  
  console.log(retangulo.calcularArea());
  console.log(retangulo.calcularPerimetro());