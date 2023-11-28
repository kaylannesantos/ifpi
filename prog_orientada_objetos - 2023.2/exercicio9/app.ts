import { Banco } from "./banco";
import { Conta } from "./conta";
import prompt from "prompt-sync"; 
import { AplicacaoError} from "./excecoes";

let input = prompt();
let banco: Banco = new Banco();
let opcao: String = '';

do {
    console.log('\n-------Digite uma opção------');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
                '4 - Depositar       5 - Excluir               6 - Transferir\n' +
                '0 - Sair\n');
    opcao = input("Opção:");

    try { // questao 14 - tratamento de exceções no menu do app.ts
        switch (opcao) { 
            case '0':
                break;
            case "1":
                inserir();
                break
            case "2":
                consultar();
                break
            case '3':
                sacar();
                break;
            case "4": 
                depositar();   
                break;
            case '5': 
                excluir();
                break;
            case '6': 
                transferir();
                break;
            case ' ':
                throw new Error('Dados inválidos, tente novamente.');
            case null:
                throw new Error("Dados inválidos, tente novamente.");
            case 'a':
                throw new Error(('Dados inválidos, tente novamente.'));
        }
    } catch (error:any) {
        if (error instanceof AplicacaoError) {
            console.log(error.message);
        } else if (error instanceof Error){
            console.log(error.message);
        }
    } finally {
        console.log("Operação finalizada.");
    }
} while (opcao != "0");
  

function inserir(): void {
    console.log("\n--------Cadastrar conta--------\n");
    let numero: string = input('Digite o número da conta: ');

    let conta: Conta;
    conta = new Conta(numero, 0);
    banco.inserir(conta);
    exibirConta(numero);
}

function exibirConta(numero: string): void {
    console.log(`Número: ${banco.consultar(numero).numero} - Saldo: ${banco.consultar(numero).saldo}`);
}

function consultar() {
    console.log("\n--------Consultar conta--------\n");
    let numero: string = input('Digite o número da conta: ');
    let conta: Conta = banco.consultar(numero)

    exibirConta(conta.numero)
}
function depositar() {
    console.log("\n--------Depositar em conta--------\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseFloat(input('Digite o valor:'));
    banco.depositar(numero, valor);
    exibirConta(numero)
}

function excluir() {
    console.log("\n--------Excluir conta--------\n");
    let numero: string = input("Digite o número da conta: ");
    banco.excluir(numero);    
}

function sacar() {
    console.log("\n--------Sacar da conta--------\n");
    let numero: string = input("Digite o número da conta: ");
    let valor: number = parseFloat(input("Digite o valor: "));
    banco.sacar(numero,valor);
    banco.consultar(numero);
}

function transferir() {
    console.log("\n--------Transferência entre contas--------\n");
    let numContaOrigem: string = input("Digite o número da conta de origem: ");
    let numContaDestino: string = input("Digite o número da conta de destino: ");
    let valor: number = parseFloat(input("Digite o valor: "));
    banco.transferir(numContaOrigem, numContaDestino, valor);
    banco.consultar(numContaOrigem);
    banco.consultar(numContaDestino);    
}
