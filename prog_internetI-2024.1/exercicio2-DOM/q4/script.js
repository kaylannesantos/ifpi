document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('carregarImagem').addEventListener('click', exibirImagem);
})

function exibirImagem() {
    let uploadImagem = document.getElementById('uploadImagem');
    let arquivoImg = uploadImagem.files[0];

    if (arquivoImg) {
        let img = document.createElement('img');
        img.src = URL.createObjectURL(arquivoImg);

        let resultado = document.getElementById('resultado');
        resultado.innerHTML = '';
        resultado.appendChild(img);
    } else {
        exibirMensagemErro('messageError', 'Por favor, selecione uma imagem antes de clicar no botão.');
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