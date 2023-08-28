/*7. Reescreva o exemplo abaixo, mantendo a quebra de linhas usando template
strings e os valores Ely, 120.56 e TypeScript venham de variáveis declaradas
separadamente e “interpoladas” na string:
Ely
My payment time is 120.56
and
my preffered language is TypeScript */

let nome: string = 'Ely';
let valorHora: number = 120.56;
let linguagem: string = 'Typescript';

console.log(`${nome}
My payment time is ${valorHora}
and 
my preffered language is ${linguagem}`);


