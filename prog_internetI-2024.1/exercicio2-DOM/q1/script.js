document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonErro').addEventListener('click', () => {
        exibirMensagemErro('messageErro', 'O campo deve ser preenchido corretamente.')
    });
});

function exibirMensagemErro(elementId, message) {
    let errorMessage = document.getElementById(elementId);
    errorMessage.textContent = message; //mensagem de erro especifica
    errorMessage.classList.remove('oculto');
    setTimeout(() => {
        errorMessage.classList.add('oculto');
    }, 3000);
}