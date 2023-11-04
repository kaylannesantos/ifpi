import { Perfil, Postagem, RepositorioDePerfis, RepositorioDePostagens } from "./index";

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

    // PERFIL
    incluir(perfil: Perfil): string {
        let perfilExsitente!: Perfil | null;

        if(perfil.idPerfil && perfil.nome && perfil.email){ //incluir perfil a partir do RepositorioDePerfis
            perfilExsitente = this.repositorioDePerfis.consultarPerfil(perfil.idPerfil, perfil.nome, perfil.email);
            if(perfilExsitente == null){
                this.repositorioDePerfis.incluirPerfil(perfil);
                return 'Perfil incluído com sucesso!';
            }
            return 'Perfil já existente!';
        }
        return 'Todos os atributos devem estar preenchidos!';
    }

    consultar(id?: number, nome?: string, email?: string): Perfil | string | null{//consultar perfil a partir do RepositorioDePerfis
        if (!(this.repositorioDePerfis.consultarPerfil(id, nome, email))){
            return 'Perfil não encontrado!';
        } 
        return this.repositorioDePerfis.consultarPerfil(id, nome, email);
    }

    //POSTAGEM 
    consultarPostagem(id: number, texto: string, hashtag: string | undefined, perfil:  Perfil){
        if(!this.repositorioDePostagens.consultarPostagem(id, texto, hashtag, perfil)){
            return 'Postagem não encontrada!'
        }

        return this.repositorioDePostagens.consultarPostagem(id, texto, hashtag, perfil);
    }
/*
    // modo 1
    incluirPostagem(postagem: Postagem): string {
        let postagemProcurada!: null;
        
        if (this.validaPostagem(postagem)) {
            let postagemExiste = this._repositorioDePostagens.consultarPostagem(postagem.idPostagem);

            if (postagemExiste !== null) {
                return 'Já existe uma postagem com o mesmo ID!';
            } else {
                this._repositorioDePostagens.incluirPostagem(postagem);
                return 'Post incluido!';
            }
        } else {
            return 'Todos os atributos da postagem devem estar preenchidos!';
        }
    
    }

    // modo 2
    incluirPostagem2(postagem: Postagem): string {
        let postagemProcurada!: Postagem | null;
    
        if (postagem.idPostagem && postagem.texto && postagem.perfil) {
            postagemProcurada = this._repositorioDePostagens.consultarPostagem(postagem.idPostagem, postagem.texto, undefined, postagem.perfil);
            if (!postagemProcurada) {
                this._repositorioDePostagens.incluirPostagem(postagem);
                return 'Postagem incluída com sucesso!';
            }
        }
        return 'Todos os atributos devem estar preenchidos!';
    }
*/
    //modo 3
    incluirPostagem(postagem: Postagem): string {
        if (this.validaPostagem(postagem)) {
            const postagemExiste = this.repositorioDePostagens.consultarPostagem(postagem.idPostagem);
    
            if (postagemExiste === null) {
                this.repositorioDePostagens.incluirPostagem(postagem);
                return 'Postagem incluída com sucesso!';
            } else {
                return 'Já existe uma postagem com o mesmo ID!';
            }
        } else {
            return 'Todos os atributos da postagem devem estar preenchidos!';
        }
    }
    
    private validaPostagem(postagem: Postagem): boolean {
        return (
            postagem.idPostagem != undefined && 
            postagem.texto != undefined &&
            postagem.perfil != undefined
        );
    }       

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
}
let redeSocial: RedeSocial = new RedeSocial();
let rperfil: RepositorioDePerfis = new RepositorioDePerfis()
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com')
let rpostagem: RepositorioDePostagens = new RepositorioDePostagens();
let postagem1: Postagem = new Postagem(1, 'texto', 8, 5, new Date(), perfil1);
console.log(rpostagem.incluirPostagem(postagem1));

export{ RedeSocial };