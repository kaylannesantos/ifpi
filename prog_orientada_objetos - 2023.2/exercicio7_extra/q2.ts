/*2. Crie uma classe Pessoa com:
a. Atributos privados _nome (tipo string) e _sobrenome (tipo string). Cada um
desses atributos deve ter métodos para lê-los (getters).
b. Um método get chamado nomeCompleto que não possui parâmetros de
entrada e que retorna a concatenação do atributo nome com o atributo
sobrenome.
c. Um construtor que recebe como parâmetros o nome e o sobrenome da
pessoa e inicializa respectivamente os atributos nome e sobrenome.
 */

class Pessoa {
    private _nome: string;
    private _sobrenome: string;

    constructor(_nome: string, _sobrenome: string) {
        this._nome = _nome;
        this._sobrenome = _sobrenome;
    }

    get nome(): string {
        return this._nome;
    }

    get sobrenome(): string {
        return this._sobrenome;
    }

    get nomeCompleto(): string {
        return this.nome + ' ' + this.sobrenome;
    }
}

//let p1: Pessoa = new Pessoa('Maria', 'De Sousa Medeiros');
//let p2: Pessoa = new Pessoa('João Victor', 'Albuquerque');

//console.log(p1.nomeCompleto);
//console.log(p2.nomeCompleto);

export { Pessoa };

