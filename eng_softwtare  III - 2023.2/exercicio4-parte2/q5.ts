interface Publicavel{ // implementar em todas as classes
    exibir():void;
    getAutor():Perfil;
}

class Perfil implements Publicavel{
    private _id: number;
    private _nameUser: string;

    constructor(id: number, nameUser: string) {
        this._id = id;
        this._nameUser = nameUser;
    }

    get id():number{ return this._id;}
    get nameUser():string{ return this._nameUser;}

    exibir(): void {
        console.log(`Perfil(${this.id}): ${this.nameUser} `);
    }

    getAutor(): Perfil {
        return this;
    }

}

class Reacao implements Publicavel {
    private _tipoReacao: string;
    private _postagem: Postagem;

    constructor(tipoReacao: string, postagem: Postagem){
        this._tipoReacao = tipoReacao;
        this._postagem = postagem;
    }

    get tipoReacao():string{ return this._tipoReacao};
    get postagem():Postagem{ return this._postagem};

    exibir(): void {
        console.log(`Usuário: ${this.postagem.autor.nameUser}\nPostagem: ${this.postagem.conteudo}\nReação: ${this.tipoReacao}`);
    }
    getAutor(): Perfil {
        return this.postagem.autor;
    }
}

class Comentario implements Publicavel{
    private _postagemOriginal: Postagem;

    constructor(postOriginal: Postagem) {
        this._postagemOriginal = postOriginal;
    }

    get postagemOriginal():Postagem{ return this._postagemOriginal}

    exibir(): void {
        console.log(`Autor: ${this.postagemOriginal.autor.nameUser}\n Post(${this.postagemOriginal.id}): ${this.postagemOriginal.conteudo}`);
        
    }

    getAutor(): Perfil {
        return this.postagemOriginal.autor;
    }
}

class Postagem implements Publicavel{
    private _id: number; //mudei de string para number
    private _autor: Perfil;
    private _conteudo: string;
    private _reacoes: Reacao[]=[];
    private _comentarios: Comentario[]=[];

    constructor(id: number, autor: Perfil, conteudo: string) {
        this._id = id;
        this._autor = autor;
        this._conteudo = conteudo;
    }

    get id(): number { return this._id; }
    get autor():Perfil{ return this._autor; }
    get conteudo():string{ return this._conteudo; }
    get reacoes():Reacao[]{ return this._reacoes}
    get comentarios():Comentario[]{ return this._comentarios}

    addReacao(reacao:Reacao):void{
        this.reacoes.push(reacao);
    }

    addComentario(comentario:Comentario){
        this.comentarios.push(comentario);
    }

    exibir(): void {//!Reação e Comentário esá retornando vázio
        console.log(`Post(${this.id}):`);
        console.log(`Usuário(${this.id}): ${this.autor.nameUser}\nPostagem: ${this.conteudo}`);

        //console.log('Reação: ' + this.reacoes);
        this.reacoes.forEach(reacao => reacao.exibir());

        //console.log('Comentario: ' + this.comentarios.map(comentario => comentario.exibir()));
        this.comentarios.forEach(comentario => comentario.exibir());
    }

    getAutor(): Perfil {
        return this.autor;
    }
}

let p1: Perfil = new Perfil(1, 'Maria')
let p2: Perfil = new Perfil(2, 'João')
let p3: Perfil = new Perfil(3, 'José')

let post1: Postagem = new Postagem(1, p1, 'eai?')
let post2: Postagem = new Postagem(2, p2, 'oi?')
let post3: Postagem = new Postagem(3, p3, 'opa!')

let r1: Reacao = new Reacao('Feliz :)', post1)
let r2: Reacao = new Reacao('Triste :(', post2)
let r3: Reacao = new Reacao('Sei lá :|', post3)

let c1: Comentario = new Comentario(post1)
let c2: Comentario = new Comentario(post2)
let c3: Comentario = new Comentario(post3)

r1.exibir();
r2.exibir();
r3.exibir();
