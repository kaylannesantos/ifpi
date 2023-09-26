import prompt from 'prompt-sync';
let input = prompt();

let nome:string = input('Digite seu nome: ');

console.log('Bom dia, ' + nome + '!');
