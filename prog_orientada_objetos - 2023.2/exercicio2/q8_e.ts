/*e. strictNullChecks para false; */
const nomeDeUsuarioLogado: string;
 
const usuarios = [
  { nome: "Henrique", idade: 12 },
  { nome: "Carol", idade: 32 },
];
 
const usuarioLogado = usuarios.find((u) => u.nome === nomeDeUsuarioLogado);
console.log(usuarioLogado.idade);