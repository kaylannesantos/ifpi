import prompt from "prompt-sync";
import {Usuario, User, Autenticacao, Leitor, Autor, Publicacao, Livro, Artigo, Biblioteca} from "./indexSolid";
import {AplicacaoError, ValorInvalidoError, UsuarioNaoEncontradoError} from "./excecoes";

let input = prompt();
let u: User = new User;
let b: Biblioteca = new Biblioteca;

let opcao: string = '';

function cadastrar(){
    console.log('\nCadastrar um usuário');
    let tipo: string = input('Seu cadastro será de autor ou leitor (a/l)? ').toLowerCase();

    let usuario!: Usuario;

    let nome: string = input('Digite seu nome completo: ')
    let nomeUsuario: string = input('Digite o nome do seu user: ');
    let senhaStr: string = input('Escolha uma senha (ela deve ser formada apenas por números): ');

    let senha: number = parseInt(senhaStr);

    try{
        if(tipo!='a' && tipo!='l'){
            throw new ValorInvalidoError(`\nO valor "${tipo}" não é válido! Por favor, verifique os campos preenchidos.`);
        }
    } catch(e: any){
        if(e instanceof AplicacaoError){
            console.log(e.message);
        }
    }

    if (tipo == 'l'){
        usuario = new Leitor(nome, nomeUsuario, senha, 0);
    } else if(tipo == 'a'){
        usuario = new Autor(nome, nomeUsuario, senha, 0);
    }

    u.cadastrar(usuario);

    console.log('\nCadastro efetuado com sucesso!');
}

function exibirUsuario(nomeUsuario:string){
    console.log(`Nome: ${u.consultarCadastro(nomeUsuario).nome}` +
    ` - User: ${u.consultarCadastro(nomeUsuario).nomeUsuario}`);
}

function consultar(){
    console.log('\nConsultar um usuário');
    let nomeUsuario: string = input('User do usuário que deseja consultar: ');
    let usuario: Usuario = u.consultarCadastro(nomeUsuario);
    exibirUsuario(nomeUsuario)
}

function excluirCadastro(){
    console.log('\nExcluir cadastro');
    let nomeUsuario: string = input('User do usuário que deseja consultar: ');
    let senhaStr: string = input('Senha do usuário: ');
    let senha: number = parseInt(senhaStr);
    u.excluir(nomeUsuario, senha);

    console.log('\nUsuário excluído com sucesso!');
}

function listarUsuarios(){
    console.log(u.listarUsuarios());
}

function publicar(){
    console.log('\nInserir uma publicação');
    let idStr: string = input('Digite o número de id da publicação: ');
    let publicacao!: Publicacao;

    let opcao: string = input('Você deseja publicar um livro ou artigo (a/l)? ').toLowerCase();
    let titulo: string = input('Título: ');
    let autor: string = input('Autor: ');
    let resumo: string = input('Resumo: ');
    let qtdPaginasStr: string = input('Quantidade de páginas: ');

    let id: number = parseInt(idStr);
    let qtdPaginas: number = parseInt(qtdPaginasStr);

    if(opcao == 'a'){
        let palavrasChave: string = input('Palavras chave: ')
        publicacao = new Artigo(id, titulo, autor, resumo, qtdPaginas, palavrasChave);
    } else if(opcao == 'l'){
        let genero: string = input('Gênero: ');
        publicacao = new Livro(id, titulo, autor, resumo, qtdPaginas, genero);
    }

    b.publicar(publicacao);

    try{
        if(opcao == 'a'){
            console.log('\nArtigo publicado com sucesso!!');
        } if(opcao == 'l'){
            console.log('\nLivro publicado com sucesso!!');
        } if(opcao!='a' && opcao!='l'){
            throw new ValorInvalidoError(`\nO valor "${opcao}" não é válido! Por favor, verifique os campos preenchidos.`);
        }
    } catch(e: any){
        if(e instanceof AplicacaoError){
            console.log(e.message);
        }
    }
}

function excluirPublicacao(){
    console.log('\nExcluir publicação');
    let idStr: string = input('Id da publicação que deseja excluir: ');
    let id: number = parseInt(idStr);
    b.excluir(id);
}

function listarPublicacoes(){
    console.log(b.listarPublicacoes());
}

function consultarPublicacao(){
    console.log('\nConsultar uma publicação');
    let idStr: string = input('Id da publicação que deseja consultar: ');
    let id: number = parseInt(idStr);
    let publicacao: Publicacao = b.consultarPublicacao(id);
    exibirPublicacao(id);
}

function exibirPublicacao(id:number){
    console.log(`Título: ${b.consultarPublicacao(id).titulo}` +
    `Autor: ${b.consultarPublicacao(id).autor}` +
    `Resumo: ${b.consultarPublicacao(id).resumo}`);
}

function acoes(){
    console.log('\nAções para seu usuário');
    let nomeUsuario: string = input('Nome de user: ');
    let senhaStr: string = input('Senha: ');
    let senha: number = parseInt(senhaStr);

    u.verificar(nomeUsuario, senha);
    let valor: string = u.verificar(nomeUsuario, senha);

    if(valor == 'autor'){
        do{
            try{
                console.log('1 - Publicar    2 - Excluir publicação    3 - Listar publicações\n' +
                '4 - Consultar Publicação    0 - Sair');
                
                opcao = input('\nDigite uma opção: ');
                switch (opcao) {
                    case '0': 
                        break;
                    case "1":
                        publicar();
                        break
                    case "2":
                        excluirPublicacao();
                        break
                    case "3":
                        listarPublicacoes();
                        break;
                    case "4":
                        consultarPublicacao();
                        break;
                }
            } catch(e: any){
                if(e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro não esperado, contate o administrador!");
                }
            }
            input('\nOperação finalizada. Pressione <enter>');
        } while(opcao != "0")
    }

    if(valor == 'leitor'){
        do{
            try{
                console.log('1 - Vizualizar publicação    2 - Listar publicações    0 - Sair');
                
                opcao = input('\nDigite uma opção: ');
                switch (opcao) {
                    case "1":
                        consultarPublicacao();
                        break
                    case "2":
                        listarPublicacoes();
                        break
                }
            } catch(e: any){
                if(e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro não esperado, contate o administrador!");
                }
            }
            input('\nOperação finalizada.');
        } while(opcao != "0")
    }
}


do{
    try{
        console.log('\nSeja bem vindo! Você deseja: ');
        console.log('1 - Cadastrar    2 - Consultar Cadastro    3 - Excluir Cadastro\n' +
        '4 - Listar Usuários    5 - Ações    0 - Sair');
        
        opcao = input('\nDigite uma opção: ');
        switch (opcao) {
            case "1":
                cadastrar();
                break
            case "2":
                consultar();
                break
            case "3":
                excluirCadastro();
                break;
            case "4":
                listarUsuarios();
                break;
            case "5":
                acoes();
                break;
        }
    } catch(e: any){
        if(e instanceof AplicacaoError) {
            console.log(e.message);
        } else {
            console.log("Erro não esperado, contate o administrador!");
        }
    }
    input('\nOperação finalizada. Pressione <enter>');
} while(opcao != "0")