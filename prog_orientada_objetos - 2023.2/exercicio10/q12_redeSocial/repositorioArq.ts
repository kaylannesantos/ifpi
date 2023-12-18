import {AtributoVazioError, PerfilExistenteError, PerfilNaoEncontradoError, PostagemJaExisteError, PostagemNaoEncontradaError } from "./excecoes";
import { Perfil, Postagem } from ".";
import * as fs from 'fs';

export interface IRepositorioDePerfis {
    get perfis(): Perfil[];
    incluirPerfil(perfil: Perfil): void;
    consultarPerfil(id?: number, nome?: string, email?: string): Perfil;
    consultarPorIndice(id:number):number;
    atualizarPerfil(perfil: Perfil):void;
    excluirPerfil(id:number):void;
}

export interface IRepositorioPostagens {
    get postagens(): Postagem[];
    consultarPorIndice(idPostagem: number): number;
    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[];
    consultarPostagemPorId(idPost: number): Postagem;
    incluirPostagem(postagem: Postagem): void;
    atualizarPostagem(postagem: Postagem):void;
}

export class RepositorioDePerfisArquivo implements IRepositorioDePerfis { // Perfil já esta ok
    private arquivo: string;

    constructor(arquivo: string) {
        this.arquivo = arquivo;
    }

    get perfis(): Perfil[] {
        const dados = this.lerArquivo();
        return dados.map((d: any) => new Perfil(d._idPerfil, d._nome, d._email));
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

    consultarPorIndice(id:number): number{
        let indiceProcurado: number = -1;
        let dados = this.lerArquivo();

        for (let i = 0; i < dados.length; i++) {
            if (dados[i]._idPerfil == id) {
                indiceProcurado = i;
            }
        }
        if (indiceProcurado == -1) {
            throw new PerfilNaoEncontradoError('Perfil não encontrado.');
        }
        return indiceProcurado;
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

    excluirPerfil(id: number): void {
        let dados = this.lerArquivo();
        let indice = dados.findIndex((d:any) => d._idPerfil == id);

        if (indice == -1) {
            throw new PerfilNaoEncontradoError('Perfil não encontrado.');
        }
        dados.splice(indice, 1);
        this.salvarArquivo(dados);
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
    
    consultarPorIndice(idPostagem: number): number { // ta ok?
        let dados = this.lerArquivo();
        let indice = dados.findIndex((d: any) => d._idPostagem === idPostagem);

        if(indice == -1){
            throw new PostagemNaoEncontradaError('Postagem não encontrada.');
        }
        
        return indice;
    }

    consultarPostagemPorId(idPost: number): Postagem { // ta ok?
        let dados = this.lerArquivo();
        let postagemProcurada = dados.find((d: any) => d._idPostagem === idPost);

        for (let p of dados) {
            if (p._idPostagem == idPost) {
                postagemProcurada = p;
            }
        }

        if (!postagemProcurada) {
            throw new PostagemNaoEncontradaError('Postagem não encontrada.')
        }
        return postagemProcurada;

        /*if(postagemProcurada === undefined){
            throw new PostagemNaoEncontradaError('Postagem não encontrada.');
        }
        return postagemProcurada;
        //this.salvarArquivo(dados);*/
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
}

