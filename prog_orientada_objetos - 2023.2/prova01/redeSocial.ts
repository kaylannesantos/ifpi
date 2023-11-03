import { Perfil, RepositorioDePerfis, RepositorioPostagens } from "./index";

class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis;
    //private _repositorioDePostagens: RepositorioPostagens;, rpostagens: RepositorioPostagens
    constructor(repositorioDePerfis: RepositorioDePerfis) {
        this._repositorioDePerfis = repositorioDePerfis;
        //this._repositorioDePostagens = rpostagens;
    }

    get repositorioDePerfis(): RepositorioDePerfis {
        return this._repositorioDePerfis;
    }

    //get respositorioDePostagens(): RepositorioPostagens {
    //    return this._repositorioDePostagens;
    //}

    incluir(perfil: Perfil): string {
        let perfilExsitente!: Perfil | null;

        if(perfil.idPerfil && perfil.nome && perfil.email){ //incluir perfil a partir do RepositorioDePerfis
            perfilExsitente = this.repositorioDePerfis.consultarPerfil(perfil.idPerfil, perfil.nome, perfil.email);
            if(perfilExsitente == null){
                this.repositorioDePerfis.incluirPerfil(perfil);
                return 'Perfil incluído com sucesso!';
            }
            return 'Perfil já existente!';
        }
        return 'Todos os atributos devem estar preenchidos!';
    }

    consultar(id?: number, nome?: string, email?: string): Perfil | null {//consultar perfil a partir do RepositorioDePerfis
        return this.repositorioDePerfis.consultarPerfil(id, nome, email);
    }

    //curtir(idPostagem: number): void {}
}

let rs: RedeSocial = new RedeSocial(new RepositorioDePerfis())

let perfil1: Perfil = new Perfil(1, 'alessandra', 'ale@gmail.com');
let perfil2: Perfil = new Perfil(1, 'kaylanne', 'kayms@gmail.com');

console.log(rs.incluir(perfil1));
console.log(rs.incluir(perfil2)); // o id já existe

console.log(rs.consultar(3));





export{ RedeSocial };