/*4. Entenda o problema da herança entre patos e suas capacidades presentes no exemplo do link:
https://www.quora.com/What-are-some-Java-examples-for-the-OOP-principle-of-favoring-objectcomposition-over-inheritance
Proponha um exemplo que também viola o LISP e exiba sua solução. */

class Retangulo{
    private _largura: number;
    private _altura: number;
    constructor(largura:number,altura:number) {
        this._largura = largura;
        this._altura = altura;
    }

    get largura():number{ return this._largura}
    get altura():number{ return this._altura}

    getArea():number{
        return this.largura * this.altura;
    }
}

class Quadrado extends Retangulo {
    private _lado: number;
    constructor(lado: number) {
        super(lado,lado)
    }
    get lado():number{return this._lado}

    getArea(): number {
        return  this.lado * this.lado; // violação a LSP
    }
}

let r: Retangulo = new Retangulo(2,3);
//console.log(r.getArea()) // 6
let q: Quadrado = new Quadrado(2);
//console.log(q.getArea()) // NaN

interface Area{
    calcularArea()
}

class RetanguloSolucao implements Area{
    constructor(private _largura:number, private _altura:number) {
        this._largura = _largura;
        this._altura = _altura;
    }

    get largura():number{ return this._largura}
    get altura():number{ return this._altura}

    calcularArea() {
        return this.largura * this.altura;
    }
}

class QuadradoSolucao implements Area{
    constructor(private _lado:number) {
        this._lado = _lado;
    }
    
    get lado():number{return this._lado}

    calcularArea() {
        return this.lado * this.lado;
    }
}

let rsolucao: RetanguloSolucao = new RetanguloSolucao(2,3);
console.log(rsolucao.calcularArea()) // 6

let qsolucao: QuadradoSolucao = new QuadradoSolucao(2);
console.log(qsolucao.calcularArea()) // 4 
