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
    get reposirotioDeHashtags(): RepositorioDeHashtags{  // getter De Hashtag
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

        for(let postagem of perfilProcurado.postagens){
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
        return this._repositorioDeHastags.hashtagMaisPopular()
    }
}
let redeSocial: RedeSocial = new RedeSocial();

let rperfil: RepositorioDePerfis = new RepositorioDePerfis();
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com');
rperfil.incluirPerfil(perfil1);
rperfil.consultarPerfil(1);

let rpostagem: RepositorioDePostagens = new RepositorioDePostagens();
let postagem1: Postagem = new Postagem(1, 'texto', 8, 5, new Date(), perfil1);
rpostagem.incluirPostagem(postagem1);
rpostagem.consultarPostagem(1);

console.log(redeSocial.exibirPostagensPopulares());












export{ RedeSocial };