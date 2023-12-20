export class Perfil{
    private _idPerfil: number;
    private _nome: string;
    private _email: string;
    private _postagensDoPerfil: Postagem[] = [];

    constructor(i:number, n:string, e:string){
        this._idPerfil = i;
        this._nome = n;
        this._email = e;
    }

    get idPerfil(): number{
        return this._idPerfil;
    }

    get nome(): string{
        return this._nome;
    }

    get email(): string{
        return this._email;
    }

    get postagensDoPerfil(): Postagem[] {
        return this._postagensDoPerfil;
    }

    set nome(nome: string){
        this._nome = nome
    }

    set email(email: string){
        this._email = email;
    }

    set idPerfil(id: number){
        this._idPerfil = id;
    }
}

export class Postagem{
    private _idPostagem: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: Date = new Date();
    private _perfil: Perfil;

    constructor(i:number, t:string, p:Perfil, c: number, d: number){
        this._idPostagem = i;
        this._texto = t;
        this._perfil = p;
        this._curtidas = c;
        this._descurtidas = d
    }

    get idPostagem(): number{
        return this._idPostagem;
    }
    set idPostagem(id: number){
        this._idPostagem = id;
    }

    get texto(): string{
        return this._texto;
    }

    get curtidas(): number{
        return this._curtidas
    }
    set curtidas(likes:number){
        this._curtidas = likes;
    }

    get descurtidas(): number{
        return this._descurtidas
    }
    set descurtidas(deslikes:number){
        this._descurtidas = deslikes;
    }

    get data(): Date{
        return this._data
    }

    get perfil(): Perfil{
        return this._perfil;
    }

    curtir(): void{
        this._curtidas++;
    }

    descurtir(): void{
        this._descurtidas++;
    }

    ehPopular(): boolean{
        return this.curtidas > (this.descurtidas + this.descurtidas * 0.5);
    }
}

export class PostagemAvancada extends Postagem{
    private _hashtags: string[] = [];
    private _visualizacoesRestantes: number = 10;
    
    constructor(i:number, t:string, p:Perfil, c: number, d: number){
        super(i, t, p, c, d);
    }

    get hashtags(): string[] {
        return this._hashtags;
    }

    get visualizacoesRestantes(): number {
        return this._visualizacoesRestantes;
    }

    set visualizacoesRestantes(v: number){
        this._visualizacoesRestantes = v
    }

    adicionarHashtag(hashtag:string): void{
        this.hashtags.push(hashtag);
    }

    existeHashtag(hashtag:string): boolean {
        let temHashtag = false;
        
        for(let h of this._hashtags){
            if(h == hashtag){
                temHashtag = true;
                break;
            }
        }
        return temHashtag;
    }

    decrementarVisualizacoes(): void { 
        if (this._visualizacoesRestantes > 0) {
            this._visualizacoesRestantes--;
        }
    }

    quantidadeDeVizualizaoes(): number{
        return 1000 - this.visualizacoesRestantes;
    }
}
