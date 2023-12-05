import {AutenticacaoInvalidaError, PublicacaoJaCadastradaError, PublicacaoNaoEncontradaError, UsuarioJaCadastradoError, UsuarioNaoEncontradoError, ValorInvalidoError} from "./excecoes"

//Princípio da Segregação de Interface (ISP) - criar interfaces mais específicas para diferenntes tipos de usuário
interface ILeitor{
    cadastrar(userLeitor:Usuario):void;
    excluir(userLeitor: Usuario):void;
    listarLeitores():string;
}

interface IAutor{
    cadastrar(userAutor: Usuario):void;
    excluir(userAutor: Usuario):void;
    listarAutores():string;
}

interface IAutenticacao{
    autentica(user: string, senha:number);
}

//Princípio da Responsabilidade Única (SRP) - a classe Usuário deve ter somente uma responsabilidade
export class Usuario {
    private _nome: string;
    private _nomeDeUsuario: string;
    private _senha: number;

    constructor(nome:string, nomeUsuario:string, senha:number){
        this._nome = nome;
        this._nomeDeUsuario = nomeUsuario;
        this._senha = senha;
        this.validarEntrada(nome); this.validarEntrada(nomeUsuario);
        this.validarValor(senha);
    }
    get nome():string{
        return this._nome;
    }
    get nomeUsuario():string{
        return this._nomeDeUsuario;
    }
    get senha():number{
        return this._senha;
    }

    validarValor(valor: number): boolean{
        if (isNaN(valor) || valor < 0){
            throw new ValorInvalidoError(`O valor ${valor} não é válido! Por favor, verifique os campos preenchidos.`);
        }
        return true;
    }

    validarEntrada(valor: string): boolean{
        if(!valor){
            throw new ValorInvalidoError('Não são aceitos valores vazios! Por favor, verifique os campos preenchidos.');
        }
        return true;
    }
}

export class Autenticacao implements IAutenticacao{
    private _usuario: Usuario;
    constructor(usuario:Usuario) {
        this._usuario = usuario;
    }
    get usuario():Usuario{
        return this._usuario;
    }

    autentica(user:string, senha:number){
        if(user != this.usuario.nomeUsuario || senha != this.usuario.senha){
            throw new AutenticacaoInvalidaError('Senha ou usuário incorreto(s)!');
        }
    }
}

/*

interface IValidacao{
    validarValor(valor:number):boolean;
    validarEntrada(valor:string):boolean;
}

export class Validacao implements IValidacao{
    private _usuario: Usuario;
    constructor(usuario:Usuario) {
        this._usuario = usuario;
    }
    get usuario():Usuario{
        return this._usuario;
    }

    validarValor(valor: number): boolean{
        if (isNaN(valor) || valor < 0){
            throw new ValorInvalidoError(`\nO valor ${valor} não é válido! Por favor, verifique os campos preenchidos.`);
        }
        return true;
    }

    validarEntrada(valor: string): boolean{
        if(!valor){
            throw new ValorInvalidoError('\nNão são aceitos valores vazios! Por favor, verifique os campos preenchidos.');
        }
        return true;
    }
}
*/

//Princípio Aberto/Fechado (OCP) e Princípio da Inversão de Dependência (DIP) - as classes Leitor e Autor implementadas/extendidas para que sejam fechadas para modificações e dependem de abstrações (IAutenticacao, IValidacao) e não de concretas (Autenticacao, Validacao)
export class Leitor implements ILeitor{
    private _usuarios: Usuario[] = [];
    //private _autenticacao: IAutenticacao;

    consultarCadastro(nomeUsuario: string): Usuario{
        let usuarioProcurado!: Usuario;
        for(let i=0; i < this._usuarios.length; i++){
            if(this._usuarios[i].nomeUsuario == nomeUsuario){
                usuarioProcurado = this._usuarios[i];
            }
        }

        if(!usuarioProcurado){
            throw new UsuarioNaoEncontradoError(`Usuário ${nomeUsuario} não foi encontrado!`)
        }

        return usuarioProcurado;
    }

    private consultarPorIndice(nomeUsuario:string): number{
        let indiceProcurado: number = -1;
        for(let i=0; i<this._usuarios.length; i++){
            for(let i=0; i < this._usuarios.length; i++){
                if(this._usuarios[i].nomeUsuario == nomeUsuario){
                    indiceProcurado = i;
                }
            }
        }

        if(indiceProcurado == -1){
            throw new UsuarioNaoEncontradoError(`User ${nomeUsuario} não foi encontrado!`)
        }

        return indiceProcurado;
    }

    cadastrar(usuario: Usuario): void {
        try{
            this.consultarCadastro(usuario.nomeUsuario);
            throw new UsuarioJaCadastradoError(`O user ${usuario.nomeUsuario} já existe! Por favor, tente outro nome.`)
        } catch(e: any){
            if(e instanceof UsuarioJaCadastradoError){
                throw e;
            }
            this._usuarios.push(usuario);
        }
    }
    excluir(usuario: Usuario): void {
        let indice: number = this.consultarPorIndice(usuario.nomeUsuario);
        //this.autenticacao.autentica(usuario.nomeUsuario, usuario.senha); //! Incompleta: como aplica-la neste código

        for(let i=indice; i<this._usuarios.length; i++){
            this._usuarios[i] = this._usuarios[i+1];
        }
        this._usuarios.pop();
    }
    
    listarLeitores(): string {
        let lista = '';
        for(let i=0; i<this._usuarios.length; i++){
            lista = lista + 
            '\nNome: ' + this._usuarios[i].nome  + 
            ' - User: ' + this._usuarios[i].nomeUsuario +
            '.'
        }
        return lista;
    }
}

export class Autor implements IAutor{
    private _usuarios: Usuario[] = [];
    //private autenticacao: IAutenticacao;

    consultarCadastro(nomeUsuario: string): Usuario{
        let usuarioProcurado!: Usuario;
        for(let i=0; i < this._usuarios.length; i++){
            if(this._usuarios[i].nomeUsuario == nomeUsuario){
                usuarioProcurado = this._usuarios[i];
            }
        }

        if(!usuarioProcurado){
            throw new UsuarioNaoEncontradoError(`Usuário ${nomeUsuario} não foi encontrado!`)
        }

        return usuarioProcurado;
    }

    private consultarPorIndice(nomeUsuario:string): number{
        let indiceProcurado: number = -1;
        for(let i=0; i<this._usuarios.length; i++){
            for(let i=0; i < this._usuarios.length; i++){
                if(this._usuarios[i].nomeUsuario == nomeUsuario){
                    indiceProcurado = i;
                }
            }
        }

        if(indiceProcurado == -1){
            throw new UsuarioNaoEncontradoError(`User ${nomeUsuario} não foi encontrado!`)
        }

        return indiceProcurado;
    }

    cadastrar(usuario: Usuario): void {
        try{
            this.consultarCadastro(usuario.nomeUsuario);
            throw new UsuarioJaCadastradoError(`O user ${usuario.nomeUsuario} já existe! Por favor, tente outro nome.`)
        } catch(e: any){
            if(e instanceof UsuarioJaCadastradoError){
                throw e;
            }
            this._usuarios.push(usuario);
        }
    }
    excluir(usuario: Usuario): void {
        let indice: number = this.consultarPorIndice(usuario.nomeUsuario);
        //this.autenticacao.autentica(usuario.nomeUsuario, usuario.senha); //! Incompleta: como aplica-la neste código

        for(let i=indice; i<this._usuarios.length; i++){
            this._usuarios[i] = this._usuarios[i+1];
        }
        this._usuarios.pop();
    }
    
    listarAutores(): string {
        let lista = '';
        for(let i=0; i<this._usuarios.length; i++){
            lista = lista + 
            '\nNome: ' + this._usuarios[i].nome  + 
            ' - User: ' + this._usuarios[i].nomeUsuario +
            '.'
        }

        return lista;
    }
}

//Demais métodos

export abstract class Publicacao{
    private _id: number;
    private _titulo: string;
    private _autor: string;
    private _resumo: string;
    private _qtdPaginas: number;

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number){
        this._id = id;
        this._titulo = titulo;
        this._autor = autor;
        this._resumo = resumo;
        this._qtdPaginas = qtdPaginas;
        this.validarValor(id); this.validarValor(qtdPaginas);
        this.validarEntrada(titulo); this.validarEntrada(autor); this.validarEntrada(resumo);
    }

    get id(){
        return this._id;
    }

    get titulo(){
        return this._titulo;
    }

    get autor(){
        return this._autor;
    }

    get resumo(){
        return this._resumo;
    }

    private validarValor(valor: number): boolean{
        if (isNaN(valor) || valor < 0){
            throw new ValorInvalidoError(`\nO valor ${valor} não é válido! Por favor, verifique os campos preenchidos.`);
        }
        return true;
    }

    private validarEntrada(valor: string): boolean{
        if(!valor){
            throw new ValorInvalidoError('\nNão são aceitos valores vazios! Por favor, verifique os campos preenchidos.');
        }
        return true;
    }
}

export class Livro extends Publicacao{
    private _genero: string;

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number, genero:string){
        super(id, titulo, autor, resumo, qtdPaginas);
        this._genero = genero;
    }
}

export class Artigo extends Publicacao{
    private _palavrasChave: string;

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number, palavras:string){
        super(id, titulo, autor, resumo, qtdPaginas);
        this._palavrasChave = palavras;
    }
}

interface IBiblioteca{
    publicar(publicacao: Publicacao): void;
    excluir(id: number): void;
    listarPublicacoes(): string;
}

export class Biblioteca implements IBiblioteca{
    private _publicacoes: Publicacao[] = [];

    publicar(publicacao: Publicacao): void{
        try{
            this.consultarPublicacao(publicacao.id);
            throw new PublicacaoJaCadastradaError(`A publicação de id ${publicacao.id} já está cadastrada!`);
        } catch(e:any){
            if(e instanceof PublicacaoJaCadastradaError){
                throw e;
            }
            this._publicacoes.push(publicacao);
        }
    }   

    consultarPublicacao(id: number): Publicacao{
        let publicacaoProcurada!: Publicacao;
        for(let i=0; i<this._publicacoes.length; i++){
            if(this._publicacoes[i].id == id){
                publicacaoProcurada = this._publicacoes[i];
            }
        }

        if(!publicacaoProcurada){
            throw new PublicacaoNaoEncontradaError(`Publicação de id ${id} não encontrada!`)
        }

        return publicacaoProcurada;
    }

   
    consultarPorIndice(id: number): number{
        let indiceProcurado: number = -1;
        for(let i=0; i<this._publicacoes.length; i++){
            if(this._publicacoes[i].id == id){
                indiceProcurado = i;
            }
        }

        if(indiceProcurado == -1){
            throw new PublicacaoNaoEncontradaError(`Publicação de id ${id} não encontrada!`)
        }

        return indiceProcurado;
    }
 
    excluir(id: number): void{
        let indice: number = this.consultarPorIndice(id);

        for(let i=indice; i<this._publicacoes.length; i++){
            this._publicacoes[i] = this._publicacoes[i+1];
        }
        this._publicacoes.pop();
    }

    listarPublicacoes(): string{
        let lista = '';

        for(let i=0; i<this._publicacoes.length; i++){
            lista = lista + 
            '\nId: ' + this._publicacoes[i].id  + 
            ' - Título: ' + this._publicacoes[i].titulo +
            ' - Autor: ' + this._publicacoes[i]. autor +
            ' - Resumo: ' + this._publicacoes[i].resumo;
        }

        return lista;
    }
}

let user1: Usuario = new Usuario('maria','eumaria',123);
let user2: Usuario = new Usuario('joao','eujoao',123);
let user3: Usuario = new Usuario('jose','eujose',123);

let leitor: Leitor = new Leitor();
leitor.cadastrar(user1);
leitor.cadastrar(user2);
leitor.cadastrar(user3);
console.log(leitor.listarLeitores());
leitor.excluir(user1);
console.log(leitor.listarLeitores());