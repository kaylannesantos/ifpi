"use strict";
/*7. Reescreva o exemplo abaixo, mantendo a quebra de linhas usando template
strings e os valores Ely, 120.56 e TypeScript venham de variáveis declaradas
separadamente e “interpoladas” na string:
Ely
My payment time is 120.56
and
my preffered language is TypeScript */
var nome = 'Ely';
var valorHora = 120.56;
var linguagem = 'Typescript';
console.log("".concat(nome, "\nMy payment time is ").concat(valorHora, "\nand \nmy preffered language is ").concat(linguagem));
