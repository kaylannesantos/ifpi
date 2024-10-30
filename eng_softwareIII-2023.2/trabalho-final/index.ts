import {AutenticacaoInvalidaError, PublicacaoJaCadastradaError, PublicacaoNaoEncontradaError, UsuarioJaCadastradoError, UsuarioNaoEncontradoError, ValorInvalidoError} from "./excecoes"

abstract class Usuario{
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

    get nomeUsuario(){
        return this._nomeDeUsuario;
    }

    get nome(){
        return this._nome;
    }

    public autentica(user:string, senha:number){
        if(user != this._nomeDeUsuario || senha != this._senha){
            throw new AutenticacaoInvalidaError('Senha ou usuário incorreto(s)!');
        }
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

class Leitor extends Usuario{
    private _moedas: number;
    constructor(nome:string, nomeUsuario:string, senha:number, moedas: number){
        super(nome, nomeUsuario, senha);
        this._moedas = moedas;
    }
}

class Autor extends Usuario{
    private _caixa: number;
    constructor(nome:string, nomeUsuario:string, senha:number, caixa: number){
        super(nome, nomeUsuario, senha);
        this._caixa = caixa;
    }
}

interface IUser{
    cadastrar(usuario: Usuario): void;
    excluir(nomeUsuario: string, senha: number): void;
    listarUsuarios(): string;
}

class User implements IUser{
    private _usuarios: Usuario[] = [];

    cadastrar(usuario: Usuario): void{
        try{
            this.consultarCadastro(usuario.nomeUsuario);
            throw new UsuarioJaCadastradoError(`\nO user ${usuario.nomeUsuario} já existe! Por favor, tente outro nome.`)
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

    excluir(nomeUsuario: string, senha: number): void{
        let indice: number = this.consultarPorIndice(nomeUsuario);
        this._usuarios[indice].autentica(nomeUsuario, senha);

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
            ' - Cadastro de: ' + tipoCadastro;
        }

        return lista;
    }

    verificar(nomeUsuario: string, senha: number): string{
        let indice: number = this.consultarPorIndice(nomeUsuario);
        this._usuarios[indice].autentica(nomeUsuario, senha);

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

abstract class Publicacao{
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

class Livro extends Publicacao{
    private _genero: string;

    constructor(id:number, titulo:string, autor:string, resumo:string, qtdPaginas:number, genero:string){
        super(id, titulo, autor, resumo, qtdPaginas);
        this._genero = genero;
    }
}

class Artigo extends Publicacao{
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

class Biblioteca implements IBiblioteca{
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

export {Usuario, User, Leitor, Autor, Publicacao, Artigo, Livro, Biblioteca};