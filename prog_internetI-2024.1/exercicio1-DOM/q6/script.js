function alterCorSubtitulo() {
    let subtitulo = document.getElementById('subtitulo');
    if (subtitulo) {
        subtitulo.style.color = 'blue'; //nova cor do subtitulo
    }
}

function alterCorParagrafo() {
    let paragrafo = document.getElementById('paragrafo');
    if (paragrafo) {
        paragrafo.style.backgroundColor = 'lightblue'; //nova cor do fundo do paragrafo
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let buttonSubtitulo = document.getElementById('button-subtitulo');
    let buttonParagrafo = document.getElementById('button-paragrafo');

    if (buttonSubtitulo) {
        buttonSubtitulo.addEventListener('click', alterCorSubtitulo);
    }
    if (buttonParagrafo) {
        buttonParagrafo.addEventListener('click',alterCorParagrafo);
    }
    
})