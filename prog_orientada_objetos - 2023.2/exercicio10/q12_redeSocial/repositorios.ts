// as vizualizacoes nao estao decrementando 
// postagensPopulares
// excluirPostagem
// consultar por hashtag 
// consultar por perfil
// curtir e descurtir

import {AplicacaoError, AtributoVazioError, PerfilExistenteError, PerfilNaoEncontradoError, PostagemJaExisteError, PostagemNaoEncontradaError } from "./excecoes";
import { Perfil, Postagem, PostagemAvancada } from ".";
import * as fs from 'fs';

export interface IRepositorioDePerfis {
    get perfis(): Perfil[];
    incluirPerfil(perfil: Perfil): void;
    consultarPerfil(id?: number, nome?: string, email?: string): Perfil;
    atualizarPerfil(perfil: Perfil):void;
}

export interface IRepositorioPostagens {
    get postagens(): Postagem[];
    consultarPorIndice(idPostagem: number): number;
    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[];
    consultarPostagemPorId(idPost: number): Postagem;
    incluirPostagem(postagem: Postagem): void;
    atualizarPostagem(postagem: Postagem):void;
    decrementarVisualizacoes(idPostagem: number): void;
}

export class RepositorioDePerfisArquivo implements IRepositorioDePerfis {
    private arquivo: string;

    constructor(arquivo: string) {
        this.arquivo = arquivo;
    }

    get perfis(): Perfil[] {
        const dados = this.lerArquivo();
        return dados.map((d: any) => new Perfil(d._idPerfil, d._nome, d._email));
    }

    incluirPerfil(perfil: Perfil): void {
        if (perfil.nome && perfil.email) {
            let dados = this.lerArquivo();
            const perfilExiste = this.perfis.find(p =>
                (p.idPerfil === perfil.idPerfil) ||
                (p.nome === perfil.nome) ||
                (p.email === perfil.email))
                    
            if (perfilExiste) {
                throw new PerfilExistenteError('O perfil já existe');
            }
            perfil.idPerfil = dados.length + 1;  // Atualiza o ID do perfil
            dados.push(perfil);
            this.salvarArquivo(dados);
            

        } else {
            throw new AtributoVazioError('Os atributos precisam ser preenchidos!');
        }
    }
    
    consultarPerfil(id?: number, nome?: string, email?: string):Perfil {
        let dados = this.lerArquivo();

        const perfilEncontrado = dados.find((d: any) => {
            return (
                (id !== undefined && d._idPerfil === id) ||
                (nome !== undefined && d._nome === nome) ||
                (email !== undefined && d._email === email)
            );
        });

        if (!perfilEncontrado) {
            throw new PerfilNaoEncontradoError('Perfil não encontrado.');
        }
        return new Perfil(perfilEncontrado._idPerfil, perfilEncontrado._nome, perfilEncontrado._email);
    }

    private lerArquivo(): any[] {
        try {
            let conteudo = fs.readFileSync(this.arquivo, 'utf-8');
            return JSON.parse(conteudo);
        } catch (error) {
            return [];
        }
    }

    private salvarArquivo(dados: any[]): void {
        fs.writeFileSync(this.arquivo, JSON.stringify(dados, null, 2), 'utf-8');
    }

    atualizarPerfil(perfil: Perfil):void{
        let dados = this.lerArquivo();
        let perfilExiste = this.perfis.find(p =>(p.idPerfil === perfil.idPerfil));
        if (!perfilExiste) {
            throw new PerfilExistenteError('O perfil já existe');
        }

        let index = this.perfis.findIndex(p => p.idPerfil == perfil.idPerfil);
        if (index != -1) {
            this.perfis[index] = perfil;
            dados[index] = perfil;
            this.salvarArquivo(dados);
        }
    }
}

export class RepositorioDePostagensArquivo implements IRepositorioPostagens {
    private arquivo: string;

    constructor(arquivo: string) {
        this.arquivo = arquivo;
    }

    private lerArquivo(): any[] {
        try {
            let conteudo = fs.readFileSync(this.arquivo, 'utf-8');
            return JSON.parse(conteudo);
        } catch (error) {
            return [];
        }
    }

    private salvarArquivo(dados: any[]): void {
        fs.writeFileSync(this.arquivo, JSON.stringify(dados, null, 2), 'utf-8');
    }

    get postagens(): Postagem[] {
        return this.lerArquivo();
    }

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] {
        let dados = this.lerArquivo();
        const postagensFiltradas = dados
            .filter((d: any) => {
                return (
                    (id === undefined || d._idPostagem === id) &&
                    (texto === undefined || d._texto.includes(texto)) &&
                    (perfil === undefined || d._perfil === perfil) &&
                    (hashtag === undefined || (d._hashtags && d._hashtags.includes(hashtag)))
                );
            });

        if (postagensFiltradas.length === 0) {
            throw new PostagemNaoEncontradaError('Postagem não encontrada');
        }
        return postagensFiltradas.map((d: any) => d);
    }

    incluirPostagem(postagem: Postagem): void {
        let dados = this.lerArquivo();
    
        if (postagem.texto.trim() && postagem.perfil) {
            postagem.idPostagem = dados.length + 1;  // Atualiza o ID da postagem
            dados.push(postagem);
            this.salvarArquivo(dados);
        } else {
            throw new AtributoVazioError('Todos os atributos da postagem devem estar preenchidos!');
        }
    }    

    consultarPorIndice(idPostagem: number): number {
        let dados = this.lerArquivo();
            
        const indice = dados.findIndex((d: any) => d._idPostagem === idPostagem);

        if(indice == -1){
            throw new PostagemNaoEncontradaError('Postagem não encontrada.');
        }
        
        return indice;
    }

    consultarPostagemPorId(idPost: number): Postagem {
        let dados = this.lerArquivo();
        const postagemProcurada = dados.find((d: any) => d._idPostagem === idPost);
        if(postagemProcurada === undefined){
            throw new PostagemNaoEncontradaError('Postagem não encontrada.');
        }
        return postagemProcurada;
        //this.salvarArquivo(dados);
    } 

    atualizarPostagem(postagem: Postagem):void{ //para atualizar os dados dos arquivos
        let dados = this.lerArquivo();
        console.log('dados-->', dados);
        
        let postagemExiste = this.postagens.find(p =>(p.idPostagem === postagem.idPostagem));
        if (!postagemExiste) {
            throw new PerfilExistenteError('O perfil já existe.');
        }

        let index = this.postagens.findIndex(p => p.idPostagem == postagem.idPostagem);
        if (index != -1) {
            this.postagens[index] = postagem;
            dados[index] = postagem;
            this.salvarArquivo(dados);
        }
    }

    decrementarVisualizacoes(idPostagem: number): void {
        let dados = this.lerArquivo();
        const indice = this.consultarPorIndice(idPostagem);
        
        if (dados[indice] instanceof PostagemAvancada) {
            const postagemAvancada = dados[indice] as PostagemAvancada;
            postagemAvancada.decrementarVisualizacoes();
            this.salvarArquivo(dados);
        }
    }
}

export class RepositorioDePerfisArray implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];

    get perfis(): Perfil[] {
        return this._perfis;
    }

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil {
        let perfilProcurado!: Perfil;
        try {
            const perfilProcurado0 = this.perfis.find(p =>
                (id === undefined || p.idPerfil === id) &&
                (nome === undefined || p.nome === nome) &&
                (email === undefined || p.email === email)
            );

            if (!perfilProcurado0) {
                throw new PerfilNaoEncontradoError('Perfil não encontrado.');
            }

            perfilProcurado = perfilProcurado0;
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.message);
            }
        }

        return perfilProcurado;
    }

    incluirPerfil(perfil: Perfil){
        try {
            if (perfil.idPerfil && perfil.nome && perfil.email) {
                let perfilExiste = this.perfis.find(p =>
                    (p.idPerfil === perfil.idPerfil) ||
                    (p.nome === perfil.nome) ||
                    (p.email === perfil.email)
                );

                if (perfilExiste) {
                    throw new PerfilExistenteError('O perfil já existe.');
                }
            } else {
                throw new AtributoVazioError('Os atributos precisam ser preenchidos.');
            }

            this.perfis.push(perfil);
            console.log('Perfil incluído com sucesso.');
        } catch (e:any){
                if(e instanceof AplicacaoError){
                    console.log(e.message);
            } 
        }
    } 

    atualizarPerfil(perfil: Perfil): void {
        console.log('Lógica não implementada!');
    }
}

export class RepositorioDePostagensArray implements IRepositorioPostagens{
    private _postagens: Postagem[] = [];

    get postagens(): Postagem[] {
        return this._postagens;
    }

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[]{
        let postagensFiltradas: Postagem[] = [];
    
        for (let p of this.postagens) {
            if ((id == undefined || p.idPostagem == id) &&
                (texto == undefined || p.texto == texto) &&
                (perfil == undefined || p.perfil == perfil)) {
                if (hashtag !== undefined && p instanceof PostagemAvancada && (p as PostagemAvancada).existeHashtag(hashtag)) {
                    postagensFiltradas.push(p);
                } else if (hashtag == undefined) {
                    postagensFiltradas.push(p);
                }
            }
        }
    
        try{
            if(postagensFiltradas.length == 0){
                throw new PostagemNaoEncontradaError('Postagem não encontrada.');
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.message);
            }
        }

        return postagensFiltradas;
    }

    consultarPostagemPorId(idPost: number): Postagem{
        let postagemProcurada!: Postagem;

        for(let p of this._postagens){
            if(p.idPostagem == idPost){
                postagemProcurada = p
            }
        }

        try{
            if(!postagemProcurada){
                throw new PostagemNaoEncontradaError('Postagem não encontrada.');
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.message);
            }
        }

        return postagemProcurada;
    }

    consultarPorIndice(id:number){
        let indiceProcurado: number = -1;
        try{
            for(let i = 0; i < this.postagens.length; i++){
                if(this.postagens[i].idPostagem == id){
                    indiceProcurado = i;
                }
            }
            if(indiceProcurado == -1){
                throw new PostagemNaoEncontradaError('Essa postagem não exite.')
            }
        } catch(e: any){
            if (e instanceof AplicacaoError){
                console.log(e.message);
            }
        }
        return indiceProcurado;
    }

    incluirPostagem(postagem: Postagem){
        try{
            if (postagem.idPostagem && postagem.texto.trim() && postagem.perfil) {
                let postagemExiste = this.consultarPostagem(postagem.idPostagem);
        
                if (postagemExiste.length == 1) {
                    throw new PostagemJaExisteError('Já existe uma postagem com o mesmo id.');
                } 
            } else {
                throw new AtributoVazioError('Todos os atributos da postagem devem estar preenchidos.');
            }

            this._postagens.push(postagem)
            postagem.perfil.postagensDoPerfil.push(postagem);
            console.log('Postagem incluída com sucesso.');
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.message);
            }
        }
    }

    atualizarPostagem(postagem: Postagem):void{
        //logica não implementada
    }
    decrementarVisualizacoes(idPostagem: number): void{
        //logica não implementada
    }
}

class NoPerfil { // armazena Perfil e tem uma referência para o próximo nó na lista.
    perfil: Perfil;
    proximo: NoPerfil | null; // referencia o próximo nó na lista (se for o último nó, é definida como null)

    constructor(perfil: Perfil) {
        this.perfil = perfil;
        this.proximo = null; 
    }
}
export class RepositorioDePerfisLista implements IRepositorioDePerfis {
    private inicio: NoPerfil | null; // início da lista encadeada, o primeiro nó. começa como null quando a lista ta vazia

    constructor() {
        this.inicio = null;
    } 

    get perfis(): Perfil[] {
        let perfis: Perfil[] = [];
        let atual = this.inicio;

        while (atual !== null) {
            perfis.push(atual.perfil);
            atual = atual.proximo;
        }
        return perfis;
    }

    incluirPerfil(perfil: Perfil): void {
        const novoNo = new NoPerfil(perfil);

        if (this.inicio == null) {
            this.inicio = novoNo;
        } else {
            let atual = this.inicio;
            while (atual.proximo != null) { // percorre até encontrar o ultimo nó 
                atual = atual.proximo;
            }
            atual.proximo = novoNo; // adiciona ao final da lista
        }

    }

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil {
        let atual = this.inicio;

        while (atual != null) {
            if (
                (id != undefined && atual.perfil.idPerfil == id) ||
                (nome != undefined && atual.perfil.nome == nome) ||
                (email != undefined && atual.perfil.email == email)
            ) {
                return atual.perfil;
            }

            atual = atual.proximo;
        }

        throw new PerfilNaoEncontradoError('Perfil não encontrado.');
    }
    atualizarPerfil(perfil: Perfil): void {
        console.log('Lógica não implementada!');
    }
}

class NoPostagem {
    postagem: Postagem;
    proximo: NoPostagem | null;

    constructor(postagem: Postagem) {
        this.postagem = postagem;
        this.proximo = null;
    }
}

export class RepositorioDePostagensLista implements IRepositorioPostagens {
    private inicio: NoPostagem | null;

    constructor() {
        this.inicio = null;
    }
    
    get postagens(): Postagem[] { //adicionei
        let postagens: Postagem[] = [];
        let atual = this.inicio;

        while (atual !== null) {
            postagens.push(atual.postagem);
            atual = atual.proximo;
        }
        return postagens;
    }

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] {
        const postagensFiltradas: Postagem[] = [];
        let atual = this.inicio;

        while (atual != null) {
            let postagem = atual.postagem;
            if (
                (id == undefined || postagem.idPostagem == id) &&
                (texto == undefined || postagem.texto == texto) &&
                (perfil == undefined || postagem.perfil == perfil)
            ) {
                if (hashtag != undefined && postagem instanceof PostagemAvancada && postagem.existeHashtag(hashtag)) {
                    postagensFiltradas.push(postagem);
                } else if (hashtag == undefined) {
                    postagensFiltradas.push(postagem);
                }
            }

            atual = atual.proximo;
        }

        return postagensFiltradas;
    }

    incluirPostagem(postagem: Postagem): void {
        const novoNo = new NoPostagem(postagem);

        if (this.inicio == null) {
            this.inicio = novoNo;
        } else {
            let atual = this.inicio;
            while (atual.proximo != null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
    }

    consultarPorIndice(idPostagem: number): number {
        let atual = this.inicio;
        let indice = 0;

        while (atual !== null) {
            if (atual.postagem.idPostagem == idPostagem) {
                return indice;
            }
            
            atual = atual.proximo;
            indice ++;
        }

        throw new PostagemNaoEncontradaError('Postagem não encontrada.') 
    }

    consultarPostagemPorId(idPost: number): Postagem {
        let atual = this.inicio;

        while (atual != null) {
            if (atual.postagem.idPostagem == idPost) {
                return atual.postagem;
            }

            atual = atual.proximo;
        }

        throw new PostagemNaoEncontradaError('Postagem não encontrada.');
    }
    atualizarPostagem(postagem: Postagem):void{
        //logica nao implementada
    }
    decrementarVisualizacoes(idPostagem: number): void{
        //logica não implementada
    }
}