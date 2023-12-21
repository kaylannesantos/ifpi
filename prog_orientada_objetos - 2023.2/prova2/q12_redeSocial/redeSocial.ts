import { IRepositorioDePerfis, IRepositorioPostagens, RepositorioDePerfisArquivo, RepositorioDePostagensArquivo } from "./repositorioArq";
import { Perfil, Postagem, PostagemAvancada} from "./index";
import { AplicacaoError, AtributoVazioError, PerfilExistenteError, PerfilNaoEncontradoError, PostagemJaExisteError, PostagemNaoEncontradaError } from "./excecoes";

export class RedeSocial {
    private _repositorioDePerfis: IRepositorioDePerfis;
    private _repositorioDePostagens: IRepositorioPostagens;

    constructor(repositorioDePerfis: IRepositorioDePerfis, repositorioDePostagens: IRepositorioPostagens) {
        this._repositorioDePerfis = repositorioDePerfis;
        this._repositorioDePostagens = repositorioDePostagens;
    }

    incluirPerfil(perfil: Perfil){
        this._repositorioDePerfis.incluirPerfil(perfil);
    }

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil {
        return this._repositorioDePerfis.consultarPerfil(id, nome, email);
    }

    excluirPefil(idPerfil: number){
        let perfilProcurado = this._repositorioDePerfis.consultarPorIndice(idPerfil);
        if (perfilProcurado == undefined) {
            throw new PerfilNaoEncontradoError('Perfil não encontrado.');
        }
        this._repositorioDePerfis.excluirPerfil(idPerfil);
        console.log('Perfil excluido com sucesso.');
    }

    incluirPostagem(postagem: Postagem){
        this._repositorioDePostagens.incluirPostagem(postagem);
    }

    consultarPostagem(id?: number | undefined, texto?: string | undefined, hashtag?: string | undefined, perfil?:  Perfil | undefined): Postagem[]{
        return this._repositorioDePostagens.consultarPostagem(id, texto, hashtag, perfil);
    }

    excluirPostagem(idPostagem: number){
        let indice: number = this._repositorioDePostagens.consultarPorIndice(idPostagem);
        for(let i = indice; i < this._repositorioDePostagens.postagens.length; i++){
            this._repositorioDePostagens.postagens[i] = this._repositorioDePostagens.postagens[i+1];
        }
        this._repositorioDePostagens.postagens.splice(indice, 1);
        console.log('Postagem excluida com sucesso.');
    }

    curtir(idPostagem: number): void {
        let postagemProcurada = this._repositorioDePostagens.consultarPostagemPorId(idPostagem); 
        if (postagemProcurada !== undefined) {
            postagemProcurada.curtir();
            this._repositorioDePostagens.atualizarPostagem(postagemProcurada);
        }
    }
    
    descurtir(idPost: number): void {
        let postagemProcurada = this._repositorioDePostagens.consultarPostagemPorId(idPost);
        if (postagemProcurada.idPostagem == idPost) {
            postagemProcurada.descurtir();
            this._repositorioDePostagens.atualizarPostagem(postagemProcurada);// chama o metodo de repositorio de postagens por arq
        }
    }

    decrementar(postagem: PostagemAvancada): void {
        postagem.decrementarVisualizacoes();
        this._repositorioDePostagens.atualizarPostagem(postagem);// chama o metodo de repositorio de postagens por arq
    }

    exibirPerfil(idPerfil?: number, nomePerfil?:string, emailPerfil?:string){ // ta ok?
        let perfilProcurado = this.consultarPerfil(idPerfil, nomePerfil, emailPerfil);
        if (perfilProcurado.idPerfil == idPerfil || perfilProcurado.nome == nomePerfil || perfilProcurado.email == emailPerfil) {
            return `\nId: ${perfilProcurado.idPerfil},\nUsuário: ${perfilProcurado.nome},\nEmail: ${perfilProcurado.email}.`;
        }
    } 

    exibirPerfis(): string{
        let perfis = '';
        for(let p of this._repositorioDePerfis.perfis){
            perfis += `
            Id: ${p.idPerfil}
            Nome: ${p.nome}
            Email: ${p.email}
            `
        }
        return perfis;
    } 

    exibirPorPostagem(idPostagem?: number, texto?: string){ // ta ok?
        let postagemProcurada = this.consultarPostagem(idPostagem, texto);

        if(idPostagem != undefined){
            return this.consultarPostagem(idPostagem);
        }

        if(texto != undefined){
            return this.consultarPostagem(undefined, texto);
        }

        if(postagemProcurada instanceof PostagemAvancada){
            if (postagemProcurada.visualizacoesRestantes > 0){
                postagemProcurada.decrementarVisualizacoes();
                this._repositorioDePostagens.atualizarPostagem(postagemProcurada); // adicionei para verificar se a contagem de visualizações funciona
            }
        }


        return postagemProcurada;
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] { // ta ok? 
        let postagensFiltradas: PostagemAvancada [] = [];
        
        let result = this.consultarPostagem(undefined, undefined, hashtag, undefined);

        if (typeof result === 'string') {
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

    exibirPostagensPorPerfil(id: number): Postagem[] { // ta ok?
        let postagensFiltradas: Postagem[] = [];
        let perfilProcurado = this.consultarPerfil(id);

        for (let postagem of perfilProcurado.postagensDoPerfil) {
            if (postagem instanceof PostagemAvancada) {
                if (postagem.visualizacoesRestantes > 0) {
                    postagensFiltradas.push(postagem);
                    postagem.decrementarVisualizacoes();
                }
            } else {
                postagensFiltradas.push(postagem);
            }
        }
        return postagensFiltradas;
        
        /*if (perfilProcurado) { // Verificar se o perfil foi encontrado
            for (let postagem of perfilProcurado.postagensDoPerfil) {
                if (postagem instanceof PostagemAvancada) {
                    if (postagem.visualizacoesRestantes > 0) {
                        postagensFiltradas.push(postagem);
                        postagem.decrementarVisualizacoes();
                    }
                } else {
                    postagensFiltradas.push(postagem);
                }
            }
        }
        return postagensFiltradas;*/
    }

    exibirTodasAsPostagens(): string{ // ta ok?
        let postagens = '';

        for (let p of this._repositorioDePostagens.postagens) {
            if (p instanceof PostagemAvancada) {
                postagens += `
                Id: ${p.idPostagem}
                Texto: ${p.texto}
                Curtidas: ${p.curtidas}
                Descurtidas: ${p.descurtidas}
                Hashtags: ${p.hashtags}
                Visualizações: ${p.quantidadeDeVizualizaoes()}
                `
                if (p.visualizacoesRestantes > 0) {
                    p.decrementarVisualizacoes();
                }
            } else {
                postagens += `
                Id: ${p.idPostagem}
                Texto: ${p.texto}
                Curtidas: ${p.curtidas}
                Descurtidas: ${p.descurtidas}
                `
            }
        }
        return postagens;
        /*for(let p of this._repositorioDePostagens.postagens){
            postagens += `
            Id: ${p.idPostagem}
            Perfil: ${p.perfil.nome}
            Texto: ${p.texto}
            Curtidas: ${p.curtidas}
            Descurtidas: ${p.descurtidas}
            `
        }
        return postagens;*/
    }
    
    postagensPopulares(): Postagem[]{ // ta ok?
        let postagensPopulares: Postagem[] = []

        for(let p of this._repositorioDePostagens.postagens){
            if(p.ehPopular()){
                postagensPopulares.push(p)
            }
        }

        if(postagensPopulares.length == 0){
            throw new PostagemNaoEncontradaError('Não há postagens populares')
        }
        return postagensPopulares;
    }

    editarNome(antigoNome: string, nomeNovo: string){
        try{
            let perfil = this.consultarPerfil(undefined, antigoNome);
            if(perfil) { 
                if (perfil.nome == nomeNovo) {
                    throw new PerfilExistenteError('O novo nome é igual ao antigo.')
                }
                perfil.nome = nomeNovo;
                this._repositorioDePerfis.atualizarPerfil(perfil);
            }

            if(!perfil){
                throw new PerfilNaoEncontradoError('Perfil não encontrado.');
            }
        } catch (e:any){
            if(e instanceof AplicacaoError){
                console.log(e.message);
            }
        }
    }

    editarEmail(antigoEmail: string, emailNovo: string){
        try{
            let perfil = this.consultarPerfil(undefined, undefined, antigoEmail);
            if (perfil) {
                if (perfil.email == emailNovo) {
                    throw new PerfilExistenteError('O novo email é igual ao antigo.')
                }
                perfil.email = emailNovo;
                this._repositorioDePerfis.atualizarPerfil(perfil);
            }

            if(!perfil){
                throw new PerfilNaoEncontradoError('Perfil não encontrado!');
            }
        } catch (e:any){
            if(e instanceof AplicacaoError){
                console.log(e.message);
            }
        }
    }
}