class Perfil{
    private _idPerfil: number;
    private _nome: string;
    private _email: string;
    private _postagensPerfil: Postagem[] = [];
    constructor(i:number, n:string, e:string){
        this._idPerfil = i;
        this._nome = n.trim();;
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
        return this._postagensPerfil;
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
        if(perfilProcurado == undefined){ //retorna o perfil caso seja encontrado no array, senão o método retorna null caso contrário.
            return null;
        }
        return perfilProcurado;
    }

    incluirPerfil(perfil: Perfil): void {
        if(!this.consultarPerfil(perfil.idPerfil, perfil.nome, perfil.email )){
            this._perfis.push(perfil);
        }
    }
}

class RepositorioDePostagens { //?
    private _postagens: Postagem[] = [];

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | string{
        let postagensFiltradas: Postagem[] = [];
    
        for (let p of this._postagens) {
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
    
        if(postagensFiltradas.length == 0){
            return 'Postagem não encontrada!'
        }

        return postagensFiltradas;
    }
    

    incluirPostagem(postagem: Postagem): string {
        if (postagem.idPostagem &&   // mudar isso
            postagem.texto.trim() &&
            postagem.perfil) {
            //let postagemExiste = this.consultarPostagem(postagem.idPostagem);
            let postagemExiste = this._postagens.find(p => p.idPostagem === postagem.idPostagem); // colocar isso no consultar
    
            if (postagemExiste) {
                return 'Já existe uma postagem com o mesmo ID!';
            } 
        } else {
            return 'Todos os atributos da postagem devem estar preenchidos!';
        }

        this._postagens.push(postagem)
        postagem.perfil.postagens.push(postagem);
        return'Postagem incluída com sucesso!';
    }  
}

//PERFIS
let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com')
let perfil2: Perfil = new Perfil(2, 'kaylanne', 'kay@gmail.com')
let perfil3: Perfil = new Perfil(3, 'alessandra', 'a@gmail.com')
let perfil4: Perfil = new Perfil(4, 'kaylanne', 'k@gmail.com')
//Repositorio de Perfis
let rperfil: RepositorioDePerfis = new RepositorioDePerfis();
rperfil.incluirPerfil(perfil1);
rperfil.incluirPerfil(perfil2);
rperfil.incluirPerfil(perfil3);
rperfil.incluirPerfil(perfil4);
//console.log(rperfil.consultarPerfil(1));

//POSTAGENS
let postagem1: Postagem = new Postagem(1, 'texto', 8, 5, new Date(), perfil1);
let postagem2: Postagem = new Postagem(2, 'textoo', 7, 4, new Date(), perfil2);
let postagem3: Postagem = new Postagem(3, 'textooo', 3, 6, new Date(), perfil3);
let postagem4: Postagem = new Postagem(4, 'textoooo', 1, 7, new Date(), perfil4);
//Repositorio de Postagens
let rpostagem: RepositorioDePostagens = new RepositorioDePostagens();
rpostagem.incluirPostagem(postagem1);
rpostagem.incluirPostagem(postagem2);
rpostagem.incluirPostagem(postagem3);
rpostagem.incluirPostagem(postagem4);
//console.log(rpostagem.consultarPostagem(1));

let pa: PostagemAvancada = new PostagemAvancada(1, 'texto', 8, 5, new Date(), perfil1)
pa.adicionarHashtag('#ola mundo!')

export { Perfil, Postagem, PostagemAvancada, RepositorioDePerfis, RepositorioDePostagens }