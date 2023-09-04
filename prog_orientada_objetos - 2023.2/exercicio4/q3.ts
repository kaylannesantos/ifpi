/*3. Ainda sobre a classe do exemplo anterior, considere o código abaixo:
let hotel : Hotel = new Hotel(2);
console.log(hotel.quantReservas);
Adicione o construtor que aceite um parâmetro inteiro e faça a inicialização do atributo
quantReservas.
*/

class Hotel {
 quantReservas : number;
    constructor(quantReservas: number) { // adição de um construtor
        this.quantReservas = quantReservas;
    }
 adicionarReserva() : void {
    this.quantReservas++;
 }
}
let hotel : Hotel = new Hotel(2);
console.log(hotel.quantReservas);
