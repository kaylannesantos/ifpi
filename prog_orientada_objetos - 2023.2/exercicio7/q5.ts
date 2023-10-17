/*5. Suponha um sistema de controle de estoque de produtos e implemente:
    a. Duas classes: Produto e ProdutoPerecivel; //!
    b. A classe Produto tem atributos privados representando identificador,
descrição, quantidade de produtos em estoque e valor unitário; //!
    c. ProdutoPerecivel tem as mesmas características de Produto, porém possui
um atributo a mais: data da validade;
(https://www.javatpoint.com/typescript-date-object). Use herança;
    d. Produto possui dois métodos para repor e dar baixa. Ambos somam e
subtraem respectivamente uma quantidade passada por parâmetro do
atributo quantidade; //!
    e. Um produto perecível possui um método que diz se um produto está válido
ou não, comparando sua data de validade com a data atual;
    f. Reescreva (use sobrescrita) os métodos de inserir, repor e dar baixa,
para que não seja possível executar a ação caso o produto não esteja na
validade;
    g. Crie uma classe chamada Estoque que possui um atributo privado
representando um array de produtos (Produto ou ProdutoPerecivel); //!
    h. Implemente métodos para inserir, consultar pelo atributo id, excluir, repor e
dar baixa nos produtos na classe estoque;
    i. Crie validações para não deixar serem incluídos produtos com mesmo id ou
mesmo nome;
    j. Os métodos repor e dar baixa na classe estoque chamam os métodos da
classe produto, para finalmente alterar a quantidade;
    k. Os vários métodos da classe devem levar em conta se o produto existe,
para isso, use o método consultar. Caso precise, crie métodos de consulta
auxiliares;
    l. Implemente um método que liste todos os produtos perecíveis vencidos. */

import PromptSync from "prompt-sync";
const input = PromptSync();

//PRODUTO
class Produto {
    private _identificador: number;
    private _descricao: string;
    private _quantidadeEstoque: number;
    private _valorUnitario: number;

    constructor(_identificador: number, _descricao: string, _quantidadeEstoque: number, _valorUnitario: number) {
        this._identificador = _identificador;
        this._descricao = _descricao;
        this._quantidadeEstoque = _quantidadeEstoque;
        this._valorUnitario = _valorUnitario;
    }

    get identificador(): number {
        return this._identificador;
    }

    get descricao(): string {
        return this._descricao;
    }

    get quantidadeEstoque(): number {
        return this._quantidadeEstoque;
    }

    set quantidadeEstoque(newQuantEstoque: number) {
        this._quantidadeEstoque = newQuantEstoque;
    }

    get valorUnitario(): number {
        return this._valorUnitario;
    }

    repor(quantEstoque: number): void {
        this.quantidadeEstoque = this.quantidadeEstoque + quantEstoque;
    
    }

    darBaixa(quantEstoque: number): void {
        this.quantidadeEstoque = this.quantidadeEstoque - quantEstoque;
    }

}

//PRODUTO PERECÍVEL
class ProdutoPerecivel extends Produto {
    dataValidade: Date;

    constructor(identificador: number, descricao: string, quantidadeEstoque: number, valorUnitario: number, dataValidade: string ) {
        super(identificador, descricao, quantidadeEstoque, valorUnitario);
        this.dataValidade = new Date(dataValidade);
    }

}

// ESTOQUE
class Estoque {
    private _produtos: Produto[] = [];

    get produtos(): Produto[] {
        return this._produtos;
    }

    set produtos(arrayProdutos: Produto[]) {
        this._produtos = arrayProdutos;
    }

    inserir(produto: Produto): void {
        this.produtos.push(produto);
    }

    reporEstoque(quantidade: number): void {
    
    }

    darBaixaEstoque(quantidade: number): void {

    }

}

let p1: Produto = new Produto(1, 'Fita isolante', 23, 24.50);
p1.darBaixa(6)
console.log(p1.quantidadeEstoque);








/*
    formatarData(): string {
        let dia = this.dataValidade.getDate();
        let mes = this.dataValidade.getMonth() + 1;
        let ano = this.dataValidade.getFullYear();
        return dia + "-" + mes + "-" + ano;

        produtoValido(): string {
        let dia = this.dataValidade.split('-')[0];
        let mes = this.dataValidade.split('-')[1];
        let ano = this.dataValidade.split('-')[2];

        let diaAtual = new Date().getDay();
        let mesAtual = new Date().getMonth();
        let anoAtual = new Date().getFullYear();

        let dataAtual = dia + '-' + mes + '-' + ano;
    }
    }
    */