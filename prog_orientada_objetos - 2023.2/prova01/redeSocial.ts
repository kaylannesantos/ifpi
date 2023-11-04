import { Perfil, Postagem, PostagemAvancada, RepositorioDePerfis, RepositorioDePostagens } from "./index";

class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis;
    private _repositorioDePostagens: RepositorioDePostagens;
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

    incluirPerfil(perfil: Perfil): string | Perfil | null{  // com problema
        return this.repositorioDePerfis.consultarPerfil(perfil.idPerfil, perfil.nome, perfil.email);
    }

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil | string | null {  //consultar perfil a partir do RepositorioDePerfis
        return this.repositorioDePerfis.consultarPerfil(id, nome, email);
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
    curtir(idPost: number): string {
        let postagemProcurada!: Postagem;
        if (postagemProcurada.idPostagem == idPost) {
            postagemProcurada.curtir();     
            return 'Postagem encontrada, curtida com sucesso!';
        }
        return 'Postagem não encontrada!';
    }

    descurtir(idPost: number): string {//deu certo(?)
        let postagemProcurada!: Postagem;
        if (postagemProcurada.idPostagem == idPost) {
            postagemProcurada.curtir();     
            return 'Postagem encontrada, descurtida com sucesso!';
        }
        return 'Postagem não encontrada!';
    }

    decrementar(postagem: PostagemAvancada): void {
        postagem.decrementarVisualizacoes();
    }
}
let redeSocial: RedeSocial = new RedeSocial();
let rperfil: RepositorioDePerfis = new RepositorioDePerfis()
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com')
let rpostagem: RepositorioDePostagens = new RepositorioDePostagens();
let postagem1: Postagem = new Postagem(1, 'texto', 8, 5, new Date(), perfil1);
console.log(rpostagem.incluirPostagem(postagem1));

export{ RedeSocial };