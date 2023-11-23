interface Publicavel{
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
    private _autor: Perfil;
    private _postagemOriginal: Postagem;

    constructor(tipoReacao: string, autor: Perfil, postagem: Postagem){
        this._tipoReacao = tipoReacao;
        this._autor = autor;
        this._postagemOriginal = postagem;
    }

    get tipoReacao():string{ return this._tipoReacao};
    get autor():Perfil{return this._autor};
    get postagemOriginal():Postagem{ return this._postagemOriginal};

    exibir(): void {
        console.log(
            `\n____________________`,
            `\nEm resposta a Postagem {`,
            `\n   id: ${this.postagemOriginal.id}`,
            `\n   autor: ${this.postagemOriginal.autor.nameUser}`,
            `\n   conteudo: ${this.postagemOriginal.conteudo}`,
            `\n}`,
            `\nReação: ${this.tipoReacao}\n`,
            `\nAutor: ${this.autor.nameUser }`,
        );
    }
    getAutor(): Perfil {
        return this.autor;
    }
}

class Comentario implements Publicavel{
    private _comentario: string;
    private _autor: Perfil;
    private _postagemOriginal: Postagem;

    constructor(comentario: string, autor: Perfil, postOriginal: Postagem) {
        this._postagemOriginal = postOriginal;
        this._autor = autor;
        this._comentario = comentario;
    }

    get comentario():string{return this._comentario};
    get autor():Perfil{return this._autor};
    get postagemOriginal():Postagem{ return this._postagemOriginal}


    exibir(): void {
        console.log(
            `\n____________________`,
            `\nEm resposta a Postagem {`,
            `\n   id: ${this.postagemOriginal.id}`,
            `\n   autor: ${this.postagemOriginal.autor.nameUser}`,
            `\n   conteudo: ${this.postagemOriginal.conteudo}`,
            `\n}`,
            `\nComentário: ${this.comentario}`,
            `\nAutor: ${this.autor.nameUser }`,
        );
        
    }

    getAutor(): Perfil {
        return this.autor;
    }
}

class Postagem implements Publicavel{
    private _id: string;
    private _autor: Perfil;
    private _conteudo: string;
    private _reacoes: Reacao[]=[];
    private _comentarios: Comentario[]=[];

    constructor(id: string, autor: Perfil, conteudo: string) {
        this._id = id;
        this._autor = autor;
        this._conteudo = conteudo;
    }

    get id(): string { return this._id; }
    get autor():Perfil{ return this._autor; }
    get conteudo():string{ return this._conteudo; }
    get reacoes():Reacao[]{ return this._reacoes}
    get comentarios():Comentario[]{ return this._comentarios}

    addReacao(reacao: Reacao):void {
        this.reacoes.push(reacao);
    }

    addComentario(comentario: Comentario):void{
        this.comentarios.push(comentario);
    }

    exibir(): void {//!Reação e Comentário está retornando vázio
        console.log(`-------Post(${this.id})-------`);
        // console.log(`Comentário do Usuário(${this.autor.nameUser}) na postagem(${this.id}) ${this.conteudo}:${this.comentarios.map(comentario => comentario.exibir())} , (reação: ).\n`);
        console.log(
            `\n____________________`,
            `\nPostagem {`,
            `\n   id: ${this.id}`,
            `\n   autor: ${this.autor.nameUser}`,
            `\n   conteudo: ${this.conteudo}`,
            `\n}`,
        );

        // console.log('Reação: ' + this.reacoes);
        this.reacoes.length > 0 ? this.reacoes.forEach(reacao => reacao.exibir()) : null;

        // console.log('Comentario: ' + this.comentarios.map(comentario => comentario.exibir()));
        this.comentarios.length > 0 ? this._comentarios.forEach(comentario => comentario.exibir()) : null;
    }

    getAutor(): Perfil {
        return this.autor;
    }
}

let p1: Perfil = new Perfil(1, 'Maria')
let p2: Perfil = new Perfil(2, 'João')
let p3: Perfil = new Perfil(3, 'José')
let p4: Perfil = new Perfil(4, 'Fulano')
let p5: Perfil = new Perfil(5, 'Ciclano')
let p6: Perfil = new Perfil(6, 'Beltrano')

let post1: Postagem = new Postagem('1', p1, 'eai?')
let post2: Postagem = new Postagem('2', p2, 'oi?')
let post3: Postagem = new Postagem('3', p3, 'opa!')

let r1: Reacao = new Reacao('Feliz :)', p1, post1)
let r2: Reacao = new Reacao('Triste :(', p2, post2)
let r3: Reacao = new Reacao('Sei lá :|', p3,  post3)
let r4: Reacao = new Reacao('Feliz :)', p4, post1)
let r5: Reacao = new Reacao('Feliz :)', p1, post1)

let c1: Comentario = new Comentario('fala!', p1, post1)
let c2: Comentario = new Comentario('oi!', p2, post2)
let c3: Comentario = new Comentario('opa?', p3, post3)
let c4: Comentario = new Comentario('fala!', p1, post1)
let c5: Comentario = new Comentario('fala!', p1, post1)

post1.exibir()