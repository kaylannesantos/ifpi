export class AplicacaoError extends Error{
    constructor(message:string){
        super(message);
    }
}

export class PerfilExistenteError extends AplicacaoError{
    constructor(message:string){
        super(message);
    }
}

export class AtributoVazioError extends AplicacaoError{
    constructor(message:string){
        super(message);
    }
}

export class PerfilNaoEncontradoError extends AplicacaoError{
    constructor(message:string){
        super(message);
    }
}

export class PostagemNaoEncontradaError extends Error{
    constructor(message:string){
        super(message);
    }
}

export class PostagemJaExisteError extends AplicacaoError{
    constructor(message:string){
        super(message);
    }
}