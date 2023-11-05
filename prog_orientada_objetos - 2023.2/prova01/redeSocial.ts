import { Perfil, Postagem, PostagemAvancada, Hashtag, RepositorioDePerfis, RepositorioDePostagens, RepositorioDeHashtags } from "./index";

class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis;
    private _repositorioDePostagens: RepositorioDePostagens;
    private _repositorioDeHastags: RepositorioDeHashtags; // Hashtag
/*
    constructor(repositorioDePerfis: RepositorioDePerfis, repositorioDePostagens: RepositorioDePostagens) {
        this._repositorioDePerfis = repositorioDePerfis;
        this._repositorioDePostagens = repositorioDePostagens;
    }
*/
    get repositorioDePerfis(): RepositorioDePerfis {
        return this._repositorioDePerfis;
    }
    get repositorioDePostagens(): RepositorioDePostagens {
        return this._repositorioDePostagens;
    }
    get reposirotioDeHashtags(): RepositorioDeHashtags{  //! getter De Hashtag
        return this._repositorioDeHastags;
    }

    incluirPerfil(perfil: Perfil): string | Perfil | undefined{  
        return this._repositorioDePerfis.incluirPerfil(perfil);
    }
    consultarPerfil(id?: number | undefined, nome?: string | undefined, email?: string | undefined): Perfil {  
        return this._repositorioDePerfis.consultarPerfil(id, nome, email);
    }
    incluirPostagem(postagem: Postagem): string{
        return this._repositorioDePostagens.incluirPostagem(postagem);
    }
    consultarPostagem(id?: number | undefined, texto?: string | undefined, hashtag?: string | undefined, perfil?:  Perfil | undefined): Postagem[] | string {
        return this._repositorioDePostagens.consultarPostagem(id, texto, hashtag, perfil);
    }
/*
private validaPostagem(postagem: Postagem): boolean {
    return (
        postagem.idPostagem != undefined && 
        postagem.texto != undefined &&
        postagem.perfil != undefined
    );
}       
*/
    // FUNÇÕES DA PÁGINA
    curtir(idPost: number): void {
        let postagemProcurada!: Postagem;
        if (postagemProcurada.idPostagem == idPost) {
            postagemProcurada.curtir();     
        }
    }

    descurtir(idPost: number): void {
        let postagemProcurada!: Postagem;
        if (postagemProcurada.idPostagem == idPost) {
            postagemProcurada.curtir();     
        }
    }

    decrementar(postagem: PostagemAvancada): void {
        postagem.decrementarVisualizacoes();
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        let postagensFiltradas: PostagemAvancada [] = [];
        
        let result = this._repositorioDePostagens.consultarPostagem(undefined, undefined, hashtag, undefined);//como instanciar ?????

        if (typeof result === 'string') {
            console.log(result);
            return postagensFiltradas;
        }

        for(let postagem of result){
            if (postagem instanceof PostagemAvancada && postagem.existeHashtag(hashtag)){
                postagem.decrementarVisualizacoes();

                if (postagem.visualizacoesRestantes > 0){
                    postagensFiltradas.push(postagem);
                }
            }
        }
        return postagensFiltradas;
    }
    exibirPostagensPorPerfil(id: number): Postagem[]{
        let postagensFiltradas: Postagem[] = [];
        let perfilProcurado = this.consultarPerfil(id);

        for(let postagem of perfilProcurado.postagensDoPerfil){
            if (postagem instanceof PostagemAvancada){
                if (postagem.visualizacoesRestantes > 0){
                    postagensFiltradas.push(postagem);
                    postagem.decrementarVisualizacoes();
                }
            } else {
                postagensFiltradas.push(postagem);
            }
        }

        return postagensFiltradas;
    }

    exibirPostagem(texto: string): string {
        return this.exibirPostagem.call(this, texto); // Chama a função no arquivo index.ts
    }

    exibirPostagensPopulares(): PostagemAvancada[] { // fazer testes
        let postagensPopulares: PostagemAvancada[] = [];
        let postagens = this._repositorioDePostagens.consultarPostagem() as PostagemAvancada[]; //downcast => Postagem = PostagemAvancada

        for(let postagem of postagens){
            if(postagem.ehPopular() && postagem.visualizacoesRestantes > 0) {
                postagensPopulares.push(postagem);
            }
        }
        return postagensPopulares;

    }

    exibirHashtgsMaisPopulares(): Hashtag | null { //! método que retorna a hashtag mais popular
        return this._repositorioDeHastags.hashtagMaisPopular();
    }
}
let redeSocial: RedeSocial = new RedeSocial();
//------------------------PERFIS
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com')
let perfil2: Perfil = new Perfil(2, 'kaylanne', 'kay@gmail.com')
let perfil3: Perfil = new Perfil(3, 'alessandra', 'a@gmail.com')
let perfil4: Perfil = new Perfil(4, 'kaylanne', 'k@gmail.com')

//console.log(rperfil.consultarPerfil(1));

//------------------------POSTAGENS
let postagem1: Postagem = new Postagem(1, 'texto',perfil1);
let postagem2: Postagem = new Postagem(2, 'textoo',perfil2);
let postagem3: Postagem = new Postagem(3, 'textooo',perfil3);
let postagem4: Postagem = new Postagem(4, 'textoooo',perfil4);

//console.log(rpostagem.consultarPostagem(1));

//!------------------------HASHTAGS
let h1: Hashtag = new Hashtag('#fluminense Ganhou!');
let h2: Hashtag = new Hashtag('#fluminense!');


let rperfil: RepositorioDePerfis = new RepositorioDePerfis();
let rpostagem: RepositorioDePostagens = new RepositorioDePostagens();
let rHashtag: RepositorioDeHashtags = new RepositorioDeHashtags();

rperfil.incluirPerfil(perfil1);
rperfil.incluirPerfil(perfil2);
rperfil.incluirPerfil(perfil3);
rperfil.incluirPerfil(perfil4);

rpostagem.incluirPostagem(postagem1);
rpostagem.incluirPostagem(postagem2);
rpostagem.incluirPostagem(postagem3);
rpostagem.incluirPostagem(postagem4);

rHashtag.incluirHashtag('#fluminense Ganhou!');
rHashtag.incluirHashtag('#fluminense!');

console.log(redeSocial.exibirHashtgsMaisPopulares());













export{ RedeSocial };