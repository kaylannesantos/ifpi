import prompt from 'prompt-sync';
let input = prompt();

import { RedeSocial } from "./redeSocial";
import { Perfil, Postagem, PostagemAvancada } from "./index";

class App {
    private _redeSocial: RedeSocial = new RedeSocial;
    private _idPerfilAnterior: number = 0;
    private _IdPostagemAnterior: number = 0;

    get redeSocial(): RedeSocial {
        return this._redeSocial;
    }

    menu(): void {
        let opcao: string = '';
        do {
            console.log('\nBEM VINDO AO APP \nDigite uma opção: ');
            console.log('1 - Consultar Perfil            2 - Incluir Perfil            3 - Editar Perfil             4 - Excluir Perfil\n' +  
                        '5 - Consultar Postagem          6 - Incluir Postagem          7 - Avaliar Postagens         8 - Excluir Postagem \n' +
                        '9 - Exibir Postagens Populares  10 - Exibir Todos os Perfis   11 - Exibir Todas as Postagens\n' +
                        '0 - Sair\n');

            opcao = input("Opção: ");
            
            switch (opcao.trim()) {
                case "1":
                    this.consultarPerfil();
                    break;
                case "2":
                    this.incluirPerfil();
                    break;
                case '3':
                    this.editarPerfil();
                    break;
                case '4':
                    this.excluirPerfil();
                    break;
                case '5':
                    this.consultarPostagem();
                    break;
                case '6':
                    this.incluirPostagem();
                    break;
                case '7':
                    this.avaliarPostagem();
                    break;
                case '8':
                    this.excluirPostagem();
                    break;
                case '9':
                    this.postagensPopulares();
                    break;
                case '10':
                    this.exibirPerfis();
                case '11':
                    this.exibirTodasPostagens();
                    break;
                case "0": console.log('Aplicação encerrada.');
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } while (opcao != "0");
    }

    consultarPerfil(): void {
        console.log('\nCONSULTAR PERFIL');
        let nomePerfil = input('Nome do perfil procurado: ').trim();
        let perfil = this.redeSocial.consultarPerfil(undefined, nomePerfil);
        console.log(perfil);
    }

    incluirPerfil(): void {
        console.log('\nCADASTRAR PERFIL');
        let idPerfil = ++this._idPerfilAnterior;
        let nome: string = input('Nome do seu perfil: ').trim();
        let email: string = input('Digite seu email: ').trim();

        let novoPerfil: Perfil = new Perfil(idPerfil, nome, email)
        this.redeSocial.incluirPerfil(novoPerfil);
    }

    editarPerfil(): void{
        console.log('EDITAR PERFIL');
        let op = input('Deseja editar o nome ou o email? (n/e) ');

        if(op == 'n'){
            let nomeA = input('Antigo Nome: ').trim();
            let nomeN = input('Novo Nome: ').trim();
            this.redeSocial.editarNome(nomeA, nomeN);
        } else if(op == 'e'){
            let emailA = input('Antigo Email: ').trim();
            let emailN = input('Novo Email: ').trim();
            this.redeSocial.editarEmail(emailA, emailN);
        } else {
            console.log('Opção inválida');
        }        
    }

    excluirPerfil(): void{
        console.log('EXCLUIR PERFIL');
        let idStr = input('Id do perfil que deseja excluir: ').trim();
        let id: number = parseFloat(idStr);
        this.redeSocial.excluirPerfil(id);
    }

    consultarPostagem(): void{
        let opcao: string = '';

        do {
            console.log('\nDigite uma opção: ');
            console.log('1 - Consultar por texto    2 - Consultar por Hashtag \n' +
                        '3 - Consultar por perfil   4 - Consultar por id\n' +
                        '0 - Voltar\n');

            opcao = input("Opção: ");
            
            switch (opcao.trim()) {
                case "1":
                    this.consultarPorTexto();
                    break;
                case "2":
                    this.consultarPorHashtag();
                    break;
                case "3": 
                    this.consultarPorPerfil();
                    break;
                case "4": 
                    this.consultarPorId();
                    break;
                case "0": console.log('Voltando à pagina inicial.');
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } while (opcao != "0");
    }

    consultarPorTexto(){
        console.log('\nCONSULTAR POSTAGEM POR TEXTO');
        let texto: string = input('Texto da postagem: ').trim();
        let postagem = this.redeSocial.exibirPorPostagem(undefined, texto);

        console.log(postagem);
    }

    consultarPorHashtag(){
        console.log('\nCONSULTAR POSTAGEM POR HASHTAG');
        let hashtag: string = input('Hashtag a ser consultada: ').trim();
        let postagens = this.redeSocial.exibirPostagensPorHashtag(hashtag);

        console.log(postagens);
    }

    consultarPorPerfil(){
        console.log('\nCONSULTAR POSTAGEM POR PERFIL');
        let nome: string = input('Nome do perfil que deseja ver as postagens: ').trim();
        let perfil = this.redeSocial.consultarPerfil(undefined, nome);
        let postagens = this.redeSocial.exibirPostagensPorPerfil(perfil.idPerfil)

        console.log(postagens);
    }

    consultarPorId(){
        console.log('\nCONSULTAR POSTAGEM POR ID');
        let idPostagemStr: string = input('Id da postagem: ').trim();
        let idPostagem: number = parseFloat(idPostagemStr)
        let postagem = this.redeSocial.exibirPorPostagem(idPostagem);

        console.log(postagem);
    }

    incluirPostagem(): void {
        console.log('\nINCLUIR POSTAGEM');
        let idPostagem = ++this._IdPostagemAnterior;
        let nomePerfil: string = input('Qual seu nome de perfil? ').trim();
        let texto: string = input('O que voce esta pensando? ').trim();
        let temHashtag: string = input('Deseja adicionar hashtag? (s/n) ').trim();

        let perfil = this._redeSocial.consultarPerfil(undefined, nomePerfil);

        if(temHashtag == 'n'){
            let novaPostagem: Postagem = new Postagem(idPostagem, texto, perfil);   
            this.redeSocial.incluirPostagem(novaPostagem);       
        } else if (temHashtag == 's') {
            let quantidadeStr = input('Quantas hashtags deseja adicionar? ').trim();
            let quantidade: number = parseFloat(quantidadeStr);

            let novaPostagem: PostagemAvancada = new PostagemAvancada(idPostagem, texto, perfil); 

            for(let i=1; i<=quantidade; i++){
                let hashtag = input('Adicione uma hashtag: ').trim();
                novaPostagem.adicionarHashtag(hashtag);
            }

            this.redeSocial.incluirPostagem(novaPostagem);
        }        
    }

    avaliarPostagem(): void {
        let opcao: string = '';

        do {
            console.log('\nDigite uma opção: ');
            console.log('1 - Avaliar por texto    2 - Avaliar por Hashtag \n' +
                        '3 - Avaliar por id \n' +
                        '0 - Voltar\n');

            opcao = input("Opção: ");
            
            switch (opcao.trim()) {
                case "1":
                    this.avaliarPorTexto();
                    break;
                case "2":
                    this.avaliarPorHashtag();
                    break;
                case "3": 
                    this.avaliarPorId();
                    break;
                case "0": console.log('Voltando à pagina inicial.');
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } while (opcao != "0");
    }

    avaliarPorTexto(): void {
        console.log('\nAVALIAR POSTAGENS POR TEXTO');
        let texto: string = input('Texto da postagem: ');
        //let postagens = this.redeSocial.consultarPostagem(undefined, texto);
        let postagens = this.redeSocial.exibirPorPostagem(undefined,texto); // corrigi

        let avaliacao = input('Voce deseja curtir ou descurtir a(s) postagem(ens)? (c/d) ').trim()
        for (let p of postagens) {
            if(p instanceof Postagem){
                if (avaliacao === 'c') {
                    this.redeSocial.curtir(p.idPostagem);
                } else if (avaliacao === 'd') {
                    this.redeSocial.descurtir(p.idPostagem);
                }
            }
            console.log(`\nPostagem(s) ${avaliacao === 'c' ? 'curtida(s)' : 'descurtida(s)'} com sucesso.`);
        }

        console.log(postagens);
    }

    avaliarPorHashtag(): void{
        console.log('\nAVALIAR POSTAGENS POR HASHTAG');
        let hashtag: string = input('Hashtag a ser avaliada: ');
        let postagens = this.redeSocial.exibirPostagensPorHashtag(hashtag);

        let avaliacao = input('Voce deseja curtir ou descurtir a(s) postagem(ens)? (c/d) ').trim()
        for (let p of postagens) {
            if(p instanceof PostagemAvancada){
                if (avaliacao === 'c') {
                    this.redeSocial.curtir(p.idPostagem);
                } else if (avaliacao === 'd') {
                    this.redeSocial.descurtir(p.idPostagem);
                }
            }
            console.log(`\nPostagem(s) ${avaliacao === 'c' ? 'curtida(s)' : 'descurtida(s)'} com sucesso.`);
        }

        console.log(postagens);
    }

    avaliarPorId(): void{
        console.log('\nAVALIAR POSTAGEM POR ID');
        let idPostagemStr: string = input('Id da postagem: ').trim();
        let idPostagem: number = parseFloat(idPostagemStr)
        //let postagem = this.redeSocial.consultarPostagem(idPostagem);
        let postagem = this.redeSocial.exibirPorPostagem(idPostagem, undefined); //corrigi

        let avaliacao = input('Voce deseja curtir ou descurtir a(s) postagem(ens)? (c/d) ').trim();
        if (avaliacao === 'c') {
            this.redeSocial.curtir(idPostagem);
        } else {
            this.redeSocial.descurtir(idPostagem);
        }

        console.log(postagem);
    }

    excluirPostagem(): void{
        console.log('EXCLUIR POSTAGEM');
        let idStr = input('Id da postagem que deseja excluir: ').trim();
        let id: number = parseFloat(idStr);
        this.redeSocial.excluirPostagem(id);
    }

    postagensPopulares(): void{
        console.log('POSTAGENS POPULARES');
        console.log(this.redeSocial.postagensPopulares())
    }

    exibirPerfis(): void{
        console.log('TODOS OS PERFIS');
        console.log(this.redeSocial.exibirPerfis());
    }

    exibirTodasPostagens(): void{
        console.log('TODAS AS POSTAGENS');
        console.log(this.redeSocial.exibirTodasAsPostagens())
    }
}

const meuApp: App = new App();
meuApp.menu();
