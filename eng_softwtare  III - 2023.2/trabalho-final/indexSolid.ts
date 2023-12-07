import {AutenticacaoInvalidaError, PublicacaoJaCadastradaError, PublicacaoNaoEncontradaError, UsuarioJaCadastradoError, UsuarioNaoEncontradoError, ValorInvalidoError} from "./excecoes"

//Princípio da Segregação de Interface (ISP) - criar interfaces mais específicas
interface IAutenticacao{
    autenticar(nomeUsuario: string, senha:number, usuario: Usuario): void;
}

interface IValidacao{
    validarValor(valor: number): boolean;
    validarEntrada(valor: string): boolean;
    validarSenha(senha:number): boolean;
}

interface IUser{
    cadastrar(usuario: Usuario): void;
    excluir(nomeUsuario: string, senha: number): void;
    listarUsuarios(): string;
}

//Princípio da Responsabilidade Única (SRP) - a classe Usuário deve ter somente uma responsabilidade
export class Usuario {
    private _nome: string;
    private _nomeDeUsuario: string;
    private _senha: number;
    private _validacao: IValidacao = new Validacao(); //Princípio de Inversão de Dependência (DIP)

    constructor(nome:string, nomeUsuario:string, senha:number){
        this._nome = nome;
        this._nomeDeUsuario = nomeUsuario;
        this._senha = senha;

        this._validacao.validarEntrada(nome);
        this._validacao.validarEntrada(nomeUsuario);
        this._validacao.validarValor(senha);
        this._validacao.validarSenha(senha);
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
}

export class Autenticacao implements IAutenticacao{    
    autenticar(nomeUsuario:string, senha:number, usuario: Usuario ): void {
        if(nomeUsuario != usuario.nomeUsuario || senha != usuario.senha){
            throw new AutenticacaoInvalidaError('Usuário ou Senha incorreto(s).');
        }
    }
}

export class Validacao implements IValidacao {
    validarValor(valor: number): boolean {
        if (isNaN(valor) || valor < 0) {
            throw new ValorInvalidoError(`O valor ${valor} não é válido. Por favor, verifique os campos preenchidos.`);
        }
        return true;
    }

    validarEntrada(valor: string): boolean {
        if (!valor) {
            throw new ValorInvalidoError('Não são aceitos valores vazios. Por favor, verifique os campos preenchidos.');
        } else if (!isNaN(Number(valor))) {
            throw new ValorInvalidoError('Valores inválidos. Por favor, verifique os campos preenchidos.');
        }
        return true;
    }

    validarSenha(valor:number):boolean{
        if (valor.toString().length != 4) {
            throw new ValorInvalidoError(`A senha contém número de digitos inválidos. Por favor, verifique o campo preenchido e tente novamente.`);
        }
        return true;
    }
}

//Princípio Aberto/Fechado (OCP) - as classes Leitor e Autor extendidas para que sejam fechadas para modificações e abertas para extensão
export class Leitor extends Usuario{
    constructor(nome:string, nomeUsuario:string, senha:number){
        super(nome, nomeUsuario, senha);
    }
}

export class Autor extends Usuario{
    constructor(nome:string, nomeUsuario:string, senha:number){
        super(nome, nomeUsuario, senha);
    }
}

export class UsersList implements IUser{
    private _usuarios: Usuario[] = [];
    private _autenticador: IAutenticacao = new Autenticacao;//Princípio de Inversão de Dependência (DIP)

    cadastrar(usuario: Usuario): void{
        try{
            this.consultarCadastro(usuario.nomeUsuario);
            throw new UsuarioJaCadastradoError(`\nO user ${usuario.nomeUsuario} já existe. Por favor, tente outro nome.`)
        } catch(e: any){
            if(e instanceof UsuarioJaCadastradoError){
                throw e;
            }
            this._usuarios.push(usuario);
        }
    }

    consultarCadastro(nomeUsuario: string): Usuario{
        let usuarioProcurado!: Usuario;
        for(let i=0; i < this._usuarios.length; i++){
            if(this._usuarios[i].nomeUsuario == nomeUsuario){
                usuarioProcurado = this._usuarios[i];
            }
        }

        if(!usuarioProcurado){
            throw new UsuarioNaoEncontradoError(`Usuário ${nomeUsuario} não foi encontrado.`)
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
            throw new UsuarioNaoEncontradoError(`User ${nomeUsuario} não foi encontrado.`)
        }

        return indiceProcurado;
    }

    excluir(nomeUsuario: string, senha: number): void{
        let indice: number = this.consultarPorIndice(nomeUsuario);
        let usuario: Usuario = this._usuarios[indice];
        this._autenticador.autenticar(nomeUsuario, senha, usuario);

        for(let i=indice; i<this._usuarios.length; i++){
            this._usuarios[i] = this._usuarios[i+1];
        }
        this._usuarios.pop();
    }

    listarUsuarios(): string{
        let lista = '';
        let tipoCadastro;

        for(let i=0; i<this._usuarios.length; i++){
            if(this._usuarios[i] instanceof Leitor){
                tipoCadastro = 'leitor'
            } else if(this._usuarios[i] instanceof Autor){
                tipoCadastro = 'autor'
            }

            lista = lista + 
            '\nNome: ' + this._usuarios[i].nome  + 
            ' - User: ' + this._usuarios[i].nomeUsuario +
            ' - Cadastro de: ' + (tipoCadastro ? tipoCadastro : 'desconhecido.');
        }

        return lista;
    }

    verificar(nomeUsuario: string, senha: number): string{
        let indice: number = this.consultarPorIndice(nomeUsuario);
        let usuario: Usuario = this._usuarios[indice];
        this._autenticador.autenticar(nomeUsuario, senha, usuario);

        let usuarioProcurado: Usuario = this.consultarCadastro(nomeUsuario);
        let tipo: string = ''
        
        if(usuarioProcurado instanceof Autor){
            tipo = 'autor';
        } 
        if(usuarioProcurado instanceof Leitor){
            tipo = 'leitor';
        }

        return tipo;
    }
}

//Princípio da Segregação de Interface (ISP) - criar interfaces mais específicas
interface IBiblioteca{ //não foi alterado
    publicar(publicacao: Publicacao): void;
    excluir(id: number): void;
    listarPublicacoes(): string;
}

//Princípio da Responsabilidade Única (SRP) - a classe Usuário deve ter somente uma responsabilidade
export class Publicacao{
    private _id: number;
    private _titulo: string;
    private _autor: string;
    private _resumo: string;
    private _qtdPaginas: number;
    private _conteudo: string;
    private _validacao: IValidacao = new Validacao(); // alterado - aplicação do Princípio de Inversão de Dependência (DIP)

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number, conteudo: string){
        this._id = id;
        this._titulo = titulo;
        this._autor = autor;
        this._resumo = resumo;
        this._qtdPaginas = qtdPaginas;
        this._conteudo = conteudo; 

        this._validacao.validarValor(id);
        this._validacao.validarValor(qtdPaginas);
        this._validacao.validarEntrada(titulo);
        this._validacao.validarEntrada(autor);
        this._validacao.validarEntrada(resumo);
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

    get conteudo(){
        return this._conteudo;
    }

    public contarPalavras(): number {
        return this.conteudo.split(" ").length;
    }
}

//Princípio Aberto/Fechado (OCP) - as classes Leitor e Autor extendidas para que sejam fechadas para modificações e abertas para extensão
export class Livro extends Publicacao{
    private _genero: string;

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number, conteudo: string, genero:string){
        super(id, titulo, autor, resumo, qtdPaginas, conteudo);
        this._genero = genero;
    }

    // Principio de Substituição de Liskov
    public contarPalavras(): number {
        return 0;
    }
}

export class Artigo extends Publicacao{
    private _palavrasChave: string;

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number, conteudo: string, palavras:string){
        super(id, titulo, autor, resumo, qtdPaginas, conteudo);
        this._palavrasChave = palavras;
    }

    public contarPalavras(): number {
        return this.conteudo.split(" ").length;
    }
}

export class Biblioteca implements IBiblioteca{ //não foi alterado
    private _publicacoes: Publicacao[] = [];

    publicar(publicacao: Publicacao): void{
        try{
            this.consultarPublicacao(publicacao.id);
            throw new PublicacaoJaCadastradaError(`A publicação de id ${publicacao.id} já está cadastrada.`);
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
            throw new PublicacaoNaoEncontradaError(`Publicação de id ${id} não encontrada.`)
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
            throw new PublicacaoNaoEncontradaError(`Publicação de id ${id} não encontrada.`)
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