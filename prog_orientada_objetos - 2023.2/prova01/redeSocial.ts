class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis;
    private _repositorioDePostagens: RepositorioPostagens;
    constructor(rperfil: RepositorioDePerfis, rpostagens: RepositorioPostagens) {
        this._repositorioDePerfis = rperfil;
        this._repositorioDePostagens = rpostagens;
    }

    get repositorioDePerfis(): RepositorioDePerfis {
        return this._repositorioDePerfis;
    }

    get respositorioDePostagens(): RepositorioPostagens {
        return this._repositorioDePostagens;
    }

    incluir(perfil: Perfil): void {
    }

    curtir(idPostagem: number): void {        
    }
}

export{ RedeSocial };