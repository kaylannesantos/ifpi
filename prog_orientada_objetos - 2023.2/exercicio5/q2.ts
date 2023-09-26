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

    consultarPostagem(id: number): number {
        let indice: number = -1;
		for (let i: number = 0; i < this.postagens.length; i++) {
			if (this.postagens[i].id == id) {
				indice = i;
				break;
			}
		}
		return indice;
    }

    inserir (postagem: Postagem): void {//add conta
        this.postagens.push(postagem);
    }

    excluir (id: number): void {//remover conta
        let indice: number = this.consultarPostagem(id);

        if (indice != -1) {
            for (let i: number = indice; i < this.postagens.length; i++) {
                this.postagens[i] = this.postagens[i + 1];
            }
            this.postagens.pop();
            console.log(`Postagem com ID ${id} foi excluída.`);
        }
    }

    postagemMaisCurtida (): Postagem {
        let maisCurtidas: number = -1;
        let postagemMaisCurtida! : Postagem;

        for (let postagem of this.postagens) {
            if (postagem.quantCurtidas >= maisCurtidas) {
                postagemMaisCurtida = postagem;
                maisCurtidas = postagem.quantCurtidas;
            }
        }
        return postagemMaisCurtida;
    }

    curtir (id: number):void {
        let postagemProcurada = this.consultarPostagem(id);

        if (postagemProcurada) {
            this.postagens[postagemProcurada].curtir();
        }
    }
}
let microblog = new Microblog();
microblog.inserir(new Postagem(1, "Essa é a 1° postagem", 0));
microblog.inserir(new Postagem(2, "Essa é a 2° postagem", 3));

microblog.consultarPostagem(2);

console.log(microblog.postagens);
