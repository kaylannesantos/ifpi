/*8. Crie uma interface chamada IComparavel com um método chamado comparar que
receba uma forma geométrica como parâmetro e retorna um inteiro como
resultado. Implemente em cada uma das classes do exemplo anterior a interface
retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a
passada via parâmetro.  */

interface IComparavel{
    comparar(formaGeometrica: FiguraGeometrica):number;
}

interface FiguraGeometrica{
    area():number;
    perimetro():number;
}

class Quadrado implements FiguraGeometrica, IComparavel{
    private _lado:number;
    
    constructor(lado:number) {
        this._lado = lado;
    }
    get lado():number{
        return this._lado;
    }

    area(): number {
        return this.lado * this.lado;
    }
    perimetro(): number {
        return this.lado * 4;
    }

    comparar(formaGeometrica: FiguraGeometrica): number {
    }
}

class Triangulo {
    private _base:number;
    private _altura:number;

    constructor(b:number, a:number){
        this._base = b;
        this._altura = a;
    }

    get base():number{
        return this._base;
    }
    get altura():number{
        return this._altura;
    }

    area(): number {
        return (this.base * this.altura) / 2;
    }
    perimetro(): number {
        return this.base * 3;
    }
}

class Circulo {
    private _raio:number;
    private _pi: number = 3.14;

    constructor(r:number) {
        this._raio = r;
    }

    get raio():number{
        return this._raio;
    }
    get pi():number{
        return this._pi; 
    }

    area(): number {
        return this.pi * (this.raio ^ 2);
    }
    perimetro(): number {
        return this.pi * this.raio * 2;
    }
}
console.log('QUADRADO');
let q: Quadrado = new Quadrado(6);
console.log('Área: ', q.area());
console.log('Perímetro: ', q.perimetro());

console.log('\nTRIANGULO');
let t: Triangulo = new Triangulo(2, 6);
console.log('Área: ', t.area());
console.log('Perímetro: ', t.perimetro());

console.log('\nCIRCULO');
let c: Circulo = new Circulo(4);
console.log('Área: ', c.area());
console.log('Perímetro: ', c.perimetro());