import { Banco } from "./banco";
import { Conta } from "./conta";
import prompt from "prompt-sync"; 

let input = prompt();
let banco: Banco = new Banco();
let opcao: String = '';

do {
    console.log('\n-------Digite uma opção------');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
                '4 - Depositar       5 - Excluir               6 - Transferir\n' +
                '7 - Exibir Conta    8 - Totalizações\n' +
                '0 - Sair\n');
    opcao = input("Opção:");
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
    }
    //input("\nOperação finalizada. Digite <enter>");
    if (opcao == '0') {
        break;
    }
} while (opcao != "0");
console.log("Aplicação encerrada!");


function inserir(): void {
    console.log("\nCadastrar conta\n");
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
    console.log("\Consultar conta\n");
    let numero: string = input('Digite o número da conta: ');
    let conta: Conta = banco.consultar(numero)

    exibirConta(conta.numero)
}
function depositar() {
    console.log("\Depositar em conta\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseFloat(input('Digite o valor:'));
    banco.depositar(numero, valor);
    exibirConta(numero)
}

function excluir() {
    console.log("\nExcluir conta\n");
    let numero: string = input("Digite o nhúmero da conta: ");
    banco.excluir(numero);    
}

function sacar() {
    console.log("\Sacar da conta\n");
    let numero: string = input("Digite o número da conta: ");
    let valor: number = parseFloat(input("Digite o valor: "));
    banco.sacar(numero,valor);
    banco.consultar(numero);
}

function transferir() {
    console.log("\nTransferência entre contas\n");
    //let numeroCredito: string = input("Digite o número da conta crédito: ");
    //let numeroDebito: string = input("Digite o número da conta débito: ")
    let numContaOrigem: string = input("Digite o número da conta de origem: ");
    let numContaDestino: string = input("Digite o número da conta de destino: ");
    let valor: number = parseFloat(input("Digite o valor: "));
    banco.transferir(numContaOrigem, numContaDestino, valor);
    banco.consultar(numContaOrigem);
    banco.consultar(numContaDestino);    
}
