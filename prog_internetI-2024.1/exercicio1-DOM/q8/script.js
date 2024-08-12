function ativarAltoContraste() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
}

function resetarCores() {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
}

document.addEventListener('DOMContentLoaded', () => {
    let buttonAltoContraste = document.getElementById('button-altoContraste');
    let buttonResetar = document.getElementById('button-resetar');

    if (buttonAltoContraste) {
        buttonAltoContraste.addEventListener('click',ativarAltoContraste);
    }
    if (buttonResetar) {
        buttonResetar.addEventListener('click',resetarCores);
    }
});