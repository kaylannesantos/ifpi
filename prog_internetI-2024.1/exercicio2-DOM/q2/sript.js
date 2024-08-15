document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('botaoExibir').addEventListener('click', exibirConteudo);
});

function exibirConteudo() {
    let caixaDeTexto = document.getElementById('caixaDeTexto').value.trim();

    if (caixaDeTexto === '') {
        exibirMensagemErro('conteudo', 'o campo não pode estar vázio.');
    } else {
        let conteudoDiv = document.getElementById(conteudo);
        conteudoDiv.textContent = caixaDeTexto;
        conteudoDiv.classList.remove('oculto');
    }
}

function exibirMensagemErro(elementId, message) {
    let errorMessage = document.getElementById(elementId);
    errorMessage.textContent = message;
    errorMessage.classList.remove('oculto');

    setTimeout(() => {
        errorMessage.classList.add('oculto');
    }, 3000);
}

