class Perfil{
    private _idPerfil: number;
    private _nome: string;
    private _email: string;
    private _postagensDoPerfil: Postagem[] = []; // alterar para _postagens (?)
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
}

//POSTAGEM
class Postagem{
    private _idPostagem: number;
    private _texto: string;
    private _curtidas: number = 0;
    private _descurtidas: number = 0;
    private _data: Date = new Date();
    private _perfil: Perfil;
    constructor(i:number, t:string, /*c:number, d:number, dt:Date,*/ p:Perfil){
        this._idPostagem = i;
        this._texto = t;
        //this._curtidas = c;
        //this._descurtidas = d;
        //this._data = dt;
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

//POSTAGEM AVANÇADA
class PostagemAvancada extends Postagem{
    private _hashtags: string[] = [];
    private _visualizacoesRestantes: number = 1000;
    private _repositorioDeHashtags: RepositorioDeHashtags; //! Atributo do Repositório de Hashtags 
    constructor(i:number, t:string, /*c:number, d:number, dt:Date,*/ p:Perfil, repositorioHashtgs: RepositorioDeHashtags){
        super(i, t, /*c, d, dt,*/ p);
        this._repositorioDeHashtags = repositorioHashtgs;
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
    get repositorioDeHashtags(): RepositorioDeHashtags { //!hashtags
        return this._repositorioDeHashtags;
    }

    adicionarHashtag(hashtag:string): void{
        this.hashtags.push(hashtag);
        this._repositorioDeHashtags.incluirHashtag(hashtag); //! inclui a hashtag tanto em PostagemAvancada como em repositorioDeHashtags
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

//!HASHTAG (criação da classe hashtag)
class Hashtag{
    private _texto: string;
    private _contador: number = 0;

    constructor(texto: string) {
        this._texto = texto;
    }

    get textoHashtag(): string {
        return this._texto;
    }
    get contadorHashtag(): number {
        return this._contador;
    }
    set contadorHashtag(novoContador: number) { //! permite além de leitura, atribuição ao contadorHashtag
        this.contadorHashtag = novoContador;
    }

    incrementarContador(): void {
        this.contadorHashtag ++;
    }
}

//REPOSITÓRIO DE PERFIL
class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil{ // resolver o problema do undefined
        let perfilProcurado!: Perfil ;

        for(let p of this._perfis){
            if((id == undefined || p.idPerfil == id) &&
                (nome == undefined || p.nome == nome) && 
                (email == undefined || p.email == email)){
                    perfilProcurado = p
            }
        } 

        return perfilProcurado;
    }

    incluirPerfil(perfil: Perfil){
        if(perfil.idPerfil && 
            perfil.nome && 
            perfil.email){
            let perfilExiste = this._perfis.find(
                p =>
                    (p.idPerfil === perfil.idPerfil) ||
                    (p.nome === perfil.nome) ||
                    (p.email === perfil.email)
            )

            if(perfilExiste){ 
                return 'Perfil já existente!';                
            } 
        } else {
            return 'Todos os atributos devem estar preenchidos!';
        }

        this._perfis.push(perfil);
        return 'Perfil incluído com sucesso!'; 
    }
}

//REPOSITÓRIO DE POSTAGENS
class RepositorioDePostagens {
    private _postagens: Postagem[] = [];

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | string {
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
        if (postagem.idPostagem &&   
            postagem.texto.trim() &&
            postagem.perfil) {
            let postagemExiste = this.consultarPostagem(postagem.idPostagem);
            //let postagemExiste = this._postagens.find(p => p.idPostagem === postagem.idPostagem); // colocar isso no consultar
    
            if (postagemExiste.length == 1) {
                return 'Já existe uma postagem com o mesmo ID!';
            } 
        } else {
            return 'Todos os atributos da postagem devem estar preenchidos!';
        }
        
        this._postagens.push(postagem)
        postagem.perfil.postagensDoPerfil.push(postagem);
        return'Postagem incluída com sucesso!';
    }  

    exibirPostagem(texto: string): string{
        let postagens: string = '';
        for(let p of this._postagens){
            if(texto == p.texto){
                postagens += `Texto: ${p.texto}
                              Perfil: ${p.perfil}`
            }
        }

        return postagens;
    }
}

//!REPOSITÓRIO DE HASHTAG (criação do repositório de hashtags)
class RepositorioDeHashtags{
    private _hashtags: Hashtag[] = [];

    incluirHashtag(texto: string): void {
        let hashtag = this._hashtags.find( h => h.textoHashtag == texto); //procura se a hashtag já existe na lista _hashtags

        if (hashtag) { //verifica se a hashtag já existe na lista
            hashtag.incrementarContador();
        }
        this._hashtags.push(new Hashtag(texto));
    }

    hashtagMaisPopular(): Hashtag | null{
        if(this._hashtags.length == 0){
            return null;
        }

        let hashtagMaisPopular = this._hashtags[0];// primeira hashtag => mais popular

        for(let i = 1; i < this._hashtags.length; i++){
            let hashtagAtual = this._hashtags[i];

            if(hashtagAtual.contadorHashtag > hashtagMaisPopular.contadorHashtag){
                hashtagMaisPopular = hashtagAtual;
            }
        }
        return hashtagMaisPopular;
/*
        return this._hashtags.reduce((maxHashtag, hashtagAtual) => { // .reduce vai iterar sobre cada hashtag existente, comparando a anterior com a atual
            return hashtagAtual.contadorHashtag > maxHashtag.contadorHashtag ? hashtagAtual : maxHashtag; //Para cada iteração, o código compara a contagem contadorHashtag
        }, this._hashtags[0]);
*/
    }
}

export { Perfil, Postagem, PostagemAvancada, Hashtag, RepositorioDePerfis, RepositorioDePostagens, RepositorioDeHashtags }