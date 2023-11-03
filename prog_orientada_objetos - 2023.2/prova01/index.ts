class Perfil{
    private _idPerfil: number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem[] = [];
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

    get postagens(): Postagem[] {
        return this._postagens;
    }
}

class Postagem{
    private _idPostagem: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: Date;
    private _perfil: Perfil;
    constructor(i:number, t:string, c:number, d:number, dt:Date, p:Perfil){
        this._idPostagem = i;
        this._texto = t;
        this._curtidas = c;
        this._descurtidas = d;
        this._data = dt;
        this._perfil = p;
    }

    get idPostagem(): number{
        return this._idPostagem;
    }

    get texto(): string{
        return this._texto;
    }

    get curtidas(): number{
        return this._curtidas
    }

    get descurtidas(): number{
        return this._descurtidas
    }

    get data(): Date{
        return this._data
    }

    get perfil(): Perfil{
        return this._perfil;
    }

    curtir(): void{
        this._curtidas ++;
    }

    descurtir(): void{
        this._descurtidas ++;
    }

    ehPopular(): boolean{
        return this.curtidas > (this.descurtidas + this.descurtidas * 50/100);
    }
}

class PostagemAvancada extends Postagem{
    private _hashtags: string[] = [];
    private _visualizacoesRestantes: number = 1000;
    constructor(i:number, t:string, c:number, d:number, dt:Date, p:Perfil){
        super(i, t, c, d, dt, p);
    }

    get hashtags(): string[] {
        return this._hashtags;
    }

    get visualizacoesRestantes(): number {
        return this._visualizacoesRestantes;
    }

    set visualizacoesRestantes(visualRestantes: number) {
        this._visualizacoesRestantes = visualRestantes;
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

//Repositórios
class RepositorioDePerfis{
    private _perfis: Perfil[]=[];

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil | null{
        let perfilProcurado!: Perfil;
        
        for (let p of this._perfis){
            if((p.idPerfil == id) || (p.nome == nome) || (p.email == email)){
                perfilProcurado = p;
                break;
            }
        }
        if(perfilProcurado == undefined){
            return null;
        }
        return perfilProcurado;
    }

    incluir(perfil: Perfil): void {
        if(!this.consultarPerfil(perfil.idPerfil, perfil.nome, perfil.email )){
            this._perfis.push(perfil);
        }
    }
}

class RepositorioPostagens{
    private _postagens: Postagem[]=[];

    consultarPostagem(id?: number, texto?:  string, hashtag?: string, perfil?: Perfil): Postagem {
        let postagemProcurada!: Postagem;

        for(let postagem of this._postagens){ //incompleto
            if((postagem.idPostagem == id) || (postagem.texto == texto) || (postagem.perfil == perfil)){
                postagemProcurada = postagem;
                break;
            }
        }
        return postagemProcurada;
    }

    incluir(postagem: Postagem): void {
        if(!this.consultarPostagem(postagem.idPostagem)){
            this._postagens.push(postagem);    
        }

        if(postagem.perfil){ //incompleto
            postagem.perfil.postagens
        }
    }
}

//Perfis
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com')
let perfil2: Perfil = new Perfil(2, 'kaylanne', 'kayms@gmail.com')
let perfil3: Perfil = new Perfil(3, 'kaylanne', 'k@gmail.com')
let perfil4: Perfil = new Perfil(4, 'maria', 'm@gmail.com')

let rperfil: RepositorioDePerfis = new RepositorioDePerfis();
rperfil.incluir(perfil1);
rperfil.incluir(perfil2);
rperfil.incluir(perfil3);
rperfil.incluir(perfil4);
//console.log(rperfil.consultarPerfil(undefined,'maria',undefined));

//Postagens
let postagem1: Postagem = new Postagem(1, 'texto', 8, 5, new Date(), perfil1);
let postagem2: Postagem = new Postagem(2, 'textoo', 7, 4, new Date(), perfil2);
let postagem3: Postagem = new Postagem(3, 'textooo', 3, 6, new Date(), perfil3);
let postagem4: Postagem = new Postagem(4, 'textoooo', 1, 7, new Date(), perfil4);

let rpostagem: RepositorioPostagens = new RepositorioPostagens();
rpostagem.incluir(postagem1);
rpostagem.incluir(postagem2);
rpostagem.incluir(postagem3);
rpostagem.incluir(postagem4);

console.log(rperfil.consultarPerfil());