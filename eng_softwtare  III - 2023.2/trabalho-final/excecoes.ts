export class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export class PublicacaoNaoEncontradaError extends AplicacaoError{
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export class PublicacaoJaCadastradaError extends AplicacaoError{
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export class ValorInvalidoError extends AplicacaoError{
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export class UsuarioNaoEncontradoError extends AplicacaoError{
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export class UsuarioJaCadastradoError extends AplicacaoError{
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export class AutenticacaoInvalidaError extends AplicacaoError{
    constructor(mensagem: string) {
        super(mensagem);
    }
}