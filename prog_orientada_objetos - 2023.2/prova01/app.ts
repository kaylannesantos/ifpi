import { RedeSocial } from "./redeSocial";
import PromptSync from "prompt-sync";
const input = PromptSync();


class App{
    private _redeSocial: RedeSocial;

    constructor(redeSocial: RedeSocial){
        this._redeSocial = redeSocial;
    }

    get redeSocial(): RedeSocial {
        return this._redeSocial;
    }

    menu(): void {
        let opcao: string = '';

        do {
            console.log('\nBem Vindo\n Digite uma opção: ');
            console.log('1 - Consultar Perfil    2 - Incçluir Perfil      3 - Consultar Postagem\n' +
                        '4 - Incluir Postagem    5 - Curtir Postagem      6 - Descurtir Postagem\n' +
                        '0 - Sair\n');

            opcao = input("Opção:");
            
            switch (opcao) {
                case "1":
                    this.consultarPerfil();
                    break;
                case "2":
                    this.incluirPerfil();
                    break;
                case "3": 
                    this.consultarPostagem();
                    break;
                case "4":
                    this.incluirPostagem();
                    break;
                case "5":
                    this.curtirPostagem();
                    break;
                case "6":
                    this.descurtirPostagem();
                    break;
                case "0": console.log('Aplicação encerrada!');
                    break;
                //process.exit();
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } while (opcao != "0");
        console.log("Aplicação encerrada");
    }

    consultarPerfil(): void {
    }

    incluirPerfil(): void {
    }

    consultarPostagem(): void {
    }

    incluirPostagem(): void {
    }

    curtirPostagem(): void {
    }

    descurtirPostagem(): void {
    }
}