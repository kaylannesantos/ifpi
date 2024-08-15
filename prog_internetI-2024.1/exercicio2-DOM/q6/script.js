document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonEnviar').addEventListener('click', selecionarRedeSocial);
})

function selecionarRedeSocial() {
    let redesSociais = document.getElementsByName('redesSociais');
    let redesSelecionadas = [];

    Array.from(redesSociais).forEach(checkbox => {
        if (checkbox.checked) {
            redesSelecionadas.push(checkbox.value);
        }
    })

    let resultado = document.getElementById('redesSelecionadas');
    let mensagemErro = document.getElementById('messageErro');

    if (redesSelecionadas.length > 0) {
        resultado.textContent = `Você selecionou as seguintes redes sociais: ${redesSelecionadas.join(', ')}`;
        resultado.classList.remove('oculto');
        mensagemErro.classList.add('oculto');
    } else {
        resultado.classList.add('oculto');
        exibirMensagemErro('messageErro', 'Por favor, selecione pelo menos uma rede social.');
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