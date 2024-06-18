/*2. Crie uma implementação que simule um migroblog:
    a. Crie uma classe Postagem e nela:
        a. Crie os atributos:
            1. id do tipo number, representando o identificador da
            postagem;
            2. texto do tipo string, representando um texto da postagem;
            3. quantidadeCurtidas do tipo number;
        b. Crie um método chamado curtir que incrementa a quantidade
        curtidas;
        c. Crie um método chamado toString que retorna a concatenação da
        postagem com a quantidade de curtidas;
    b. Crie uma classe Microblog e nela:
        a. Crie um array de classes Postagem;
        b. Crie um método que inclua uma postagem passada como
        parâmetro no array de postagens;
        c. Crie um método de excluir uma postagem que recebe um id
        passado por parâmetro. Para isso, efetue uma busca pelo id nas
        postagens do array e faça a exclusão de forma análoga à feita na
        classe Banco;
        d. Crie um método que retorna a postagem mais curtida;
        e. Crie um método curtir em que se passa um id como parâmetro e a
        classe microblog pesquisa a postagem e chama seu método curtir
        da própria postagem;
        f. Crie um método toString que retorna a concatenação do “toString”
        de todas as postagens.
*/

class Postagem {
    id: number;
    texto: string;
    quantidadeCurtidas: number;

    constructor(id: number, texto: string, quantidadeCurtidas: number) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = quantidadeCurtidas;
    }

    curtir(): void {
        this.quantidadeCurtidas ++;
    }

    toString(): string {
        return 'Id: ' + this.id + ', Texto: ' + this.texto + ', Quantidade Curtidas: ' + this.quantidadeCurtidas;
    }
}

class Microblog {
    postagens: Postagem[] = [];

    inserirPostagem(postagem: Postagem): void {
        this.postagens.push(postagem);
    }

    excluirPostagem(id: number): void {
        if (id != -1) {
            for (let i: number = id; i < this.postagens.length; i++) {
                this.postagens[i] = this.postagens[i + 1];
            }

            this.postagens.pop();
        }
    }

    postagemMaisCurtida(): Postagem {

    }
}

let p1: Postagem = new Postagem(1, 'Primeira postagem', 3);
console.log(p1.toString());