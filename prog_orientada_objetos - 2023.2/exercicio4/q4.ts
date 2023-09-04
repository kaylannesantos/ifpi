/*4. Considere a classe Radio e as instruções que fazem seu uso abaixo:
class Radio {
 volume : number;
 constructor(volume : number) {
 this.volume = volume;
 }
}
let r : Radio = new Radio();
r.volume = 10;
Justifique o erro de compilação e proponha uma solução.
*/

class Radio {
 volume : number;

 constructor(volume : number) {
 this.volume = volume;
 }
}
let r : Radio = new Radio(10); // correção ->O erro deve-se ao fato de não ter um valor passado ao construtor, dessa forma
                              // deve-se passar um valor para o construtor atribuir a propiedade volume
console.log(r.volume);
