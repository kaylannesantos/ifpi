//exceção questão 07
export class AplicacaoError extends Error{
    constructor(message: string) {
        super(message);
    }
}

//exceção questão 07
export class ContaInexistenteError extends AplicacaoError{
    constructor(message:string) {
        super(message);
    }
}

//exceção questão 07
export class SaldoInsuficienteError extends AplicacaoError{
    constructor(message) {
        super(message);
    }
}

//exceção questão 10
export class ValorInvalidoError extends AplicacaoError{
    constructor(message:string) {
        super(message);
    }
}

//exceção questão 12
export class PoupancaInvalidaError extends AplicacaoError{
    constructor(message:string) {
        super(message);
    }
}

// questão 13 - verificar se conta já esta cadastrada
export class ContaJaCadastradaError extends AplicacaoError{ 
    constructor(message:string) {
        super(message);
    }
}