import { Perfil, Postagem, PostagemAvancada, RepositorioDePerfis, RepositorioDePostagens } from "./index";

class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis = new RepositorioDePerfis();
    private _repositorioDePostagens: RepositorioDePostagens = new RepositorioDePostagens();

    get repositorioDePerfis(): RepositorioDePerfis {
        return this._repositorioDePerfis;
    }

    get respositorioDePostagens(): RepositorioDePostagens {
        return this._repositorioDePostagens;
    }

    incluirPerfil(perfil: Perfil){  
        this._repositorioDePerfis.incluirPerfil(perfil);
    }

    consultarPerfil(id?: number | undefined, nome?: string | undefined, email?: string | undefined): Perfil {  
        return this._repositorioDePerfis.consultarPerfil(id, nome, email);
    }

    incluirPostagem(postagem: Postagem){
        this._repositorioDePostagens.incluirPostagem(postagem);
    }

    consultarPostagem(id?: number | undefined, texto?: string | undefined, hashtag?: string | undefined, perfil?:  Perfil | undefined): Postagem[]{
        return this._repositorioDePostagens.consultarPostagem(id, texto, hashtag, perfil);
    }

    curtir(idPost: number): void {
        this.respositorioDePostagens.curtir(idPost)
    }

    descurtir(idPost: number): void {
        this.respositorioDePostagens.descurtir(idPost)
    }

    decrementar(postagem: PostagemAvancada): void {
        postagem.decrementarVisualizacoes();
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        let postagensFiltradas: PostagemAvancada [] = [];
        
        let result = this._repositorioDePostagens.consultarPostagem(undefined, undefined, hashtag, undefined);//como instanciar ????????

        if (typeof result === 'string') {
            console.log(result);
            return postagensFiltradas;
        }

        for(let postagem of result){
            if (postagem instanceof PostagemAvancada && postagem.existeHashtag(hashtag)){
                if (postagem.visualizacoesRestantes > 0){
                    postagensFiltradas.push(postagem);
                    postagem.decrementarVisualizacoes();
                }
            }
        }
        return postagensFiltradas;
    }

    exibirPostagensPorPerfil(id: number): Postagem[]{
        return this.repositorioDePerfis.exibirPostagensPorPerfil(id)
    }

    exibirTodasAsPostagens(): string{
        return this.respositorioDePostagens.exibirTodasPostagens()
    }

    exibirPerfis(): string{
        return this.repositorioDePerfis.exibirTodosOsPerfis();
    }

    exibirPostagensPopulares(): PostagemAvancada[] { // fazer testes
        let postagensPopulares: PostagemAvancada[] = [];
        let postagens = this._repositorioDePostagens.consultarPostagem() as PostagemAvancada[]; //downcast => Postagem = PostagemAvancada

        for (const postagem of postagens) {
            if (postagem.ehPopular() && postagem.visualizacoesRestantes > 0) {
                postagensPopulares.push(postagem);
                postagem.decrementarVisualizacoes();
            }
        }
        return postagensPopulares;

    }
}
let rs: RedeSocial = new RedeSocial();
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com')
let perfil2: Perfil = new Perfil(2, 'kaylanne', 'kay@gmail.com')

let postagem1: Postagem = new Postagem(1, 'texto',perfil1);
let postagem2: Postagem = new Postagem(2, 'textoo',perfil2);

let rperfil: RepositorioDePerfis = new RepositorioDePerfis();
let rpostagem: RepositorioDePostagens = new RepositorioDePostagens();

rperfil.incluirPerfil(perfil1);
rperfil.incluirPerfil(perfil2);

rpostagem.incluirPostagem(postagem1);
rpostagem.incluirPostagem(postagem2);

rpostagem.curtir(1);
rpostagem.curtir(1);
rpostagem.curtir(1);
rpostagem.descurtir(1);
rpostagem.descurtir(1);
rpostagem.descurtir(2);
rpostagem.curtir(2);
rpostagem.curtir(2);

console.log(rs.exibirPostagensPopulares());


export{ RedeSocial };