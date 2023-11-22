class AplicacaoError extends Error{
    constructor(message: string) {
        super(message);
    }
}

class ContaInexistenteError extends AplicacaoError{
    constructor(message:string) {
        super(message);
    }
}

class SaldoInsuficienteError extends AplicacaoError{
    constructor(message) {
        super(message);
    }
}

//exceção q10
class ValorInvalidoError extends AplicacaoError{ // herda de AplicacaoError ou de e AplicacaoException???
    constructor(message:string) {
        super(message);
    }
}

//exceção q12
class PoupancaInvalidaError extends AplicacaoError{
    constructor(message:string) {
        super(message);
    }
}