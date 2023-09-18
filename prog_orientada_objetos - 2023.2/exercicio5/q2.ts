/*2. Crie uma implementação que simule um microblog:
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
da própria postagem;*/

class Postagem {
    id: number;
    texto: string;
    quantCurtidas: number;

    constructor(id: number, texto: string, quantCurtidas: number) {
        this.id = id;
        this.texto = texto;
        this.quantCurtidas = quantCurtidas;
    }

    curtir (): void {
        this.quantCurtidas ++;
    }

    toString (): string {
        return "Id: " + this.id + ",Post: " + this.texto + "e Quantidade de likes: " + this.quantCurtidas;
    }
}



class Microblog {
    postagens: Postagem[] = [];

    inserir (postagem: Postagem): void {//add conta
        this.postagens.push(postagem);
    }

    excluir (id: number): void {//remover conta
      for (let i = 0; i < this.postagens.length; i++) {
      if (this.postagens[i].id === id) {
        this.postagens.pop();
        console.log(`Postagem com ID ${id} foi excluída.`);
        return;
      }
    }
    console.log(`Postagem com ID ${id} não foi encontrada.`);
    }

    postagemMaisCurtida () {
        let postagemMaisCurtida = this.postagens[0];
        for (let i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].quantCurtidas > postagemMaisCurtida.quantCurtidas) {
                postagemMaisCurtida = this.postagens[i];
              }
        }console.log(`Postagem com mais curtidas: ${postagemMaisCurtida.id}`);
        return;
    }
}

let p1: Postagem = new Postagem(1, "Primeiro Post!", 1)
p1.curtir;
let a: Microblog = new Microblog();
a.inserir(new Postagem(1, "teste de postagem", 3));
a.excluir(2);
console.log(a.inserir)