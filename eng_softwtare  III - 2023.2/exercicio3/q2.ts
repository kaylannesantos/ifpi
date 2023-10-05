/*2. Crie uma classe Hora que tenha:
a. Três atributos privados e definidos no construtor chamados hora, minutos e
segundos;
b. Métodos públicos para ler hora, minuto e segundo de forma individual;
c. Um método público para retorne a hora no formato “hh:mm:ss”. */

class Hora {
    private _horas: number;
    private _minutos: number;
    private _segundos: number;

    constructor(_horas: number, _minutos: number, _segundos: number) {
        this._horas = _horas;
        this._minutos = _minutos;
        this._segundos = _segundos;
    }

    horario():string {
        return this._horas + ":" + this._minutos + ":" + this._segundos;
    }
}

let h1: Hora = new Hora(10,54,25);

console.log(`São exatamente: ${h1.horario()}`);
