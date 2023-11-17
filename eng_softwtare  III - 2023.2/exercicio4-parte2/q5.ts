interface Publicavel{
    exibir():void;
    getAutor():Perfil;
}

//Rever a lógica de todas as classes e refatorar
class Perfil implements Publicavel {
    private _id: number;
    private _nameUser: string;

    constructor(id: number, nameUser: string) {
        this._id = id;
        this._nameUser = nameUser;
    }

    get id():number{
        return this._id;
    }
    get nameUser():string{
        return this._nameUser;
    }

    exibir(): void {
    }

    getAutor(): Perfil { // rever a lógica deste método
        return new Perfil(this.id, this.nameUser);
    }
}

class Postagem implements Publicavel{
    private _id: string;
    private _autor: Perfil;
    private _conteudo: string;

    constructor(id: string, autor: Perfil, conteudo: string) {
        this._id = id;
        this._autor = autor;
        this._conteudo = conteudo;
    }

    get id(): string {
        return this._id;
    }
    get autor():Perfil{
        return this._autor;
    }
    get conteudo():string{
        return this._conteudo;
    }

    getAutor(): Perfil {
        return this.autor;
    }

    exibir(): void {
        console.log(`Postagem: ${this.id} de ${this.autor.getAutor()}`);
    }
    
}

class Reacao implements Publicavel{
    private _tipoReacao: string;
    private _postagem: Postagem;
    private _perfil: Perfil;

    constructor(tipoReacao: string, post: Postagem, perfil: Perfil ) {
        this._postagem = post;
        this._perfil = perfil;
        this._tipoReacao = tipoReacao;
    }

    get tipoReacao():string{
        return this._tipoReacao;
    }
    get postagem():Postagem{
        return this._postagem;
    }
    get perfil():Perfil{
        return this._perfil;
    }

    getAutor(): Perfil {//qual a lógica desse métodoooooooo??????
        
    }

    exibir(): void {
        console.log(`Reação: ${this.tipoReacao} de ${this.perfil.nameUser} na postagem ${this.postagem.conteudo}`);
    }


}

