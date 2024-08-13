function aumentarTexto() {
    let paragrafo = document.querySelectorAll('p');
    paragrafo.forEach((p) => {
        let tamanhoAtual = parseFloat(window.getComputedStyle(p, null).getPropertyValue('font-size'));
        p.style.fontSize = (tamanhoAtual + 2) + 'px';
    });
}

function diminuirTexto() {
    let paragrafo = document.querySelectorAll('p');
    paragrafo.forEach((p) => {
        let tamanhoAtual = parseFloat(window.getComputedStyle(p, null).getPropertyValue('font-size'));
        p.style.fontSize = (tamanhoAtual - 2) + 'px';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button-max').addEventListener('click', aumentarTexto);
    document.getElementById('button-min').addEventListener('click', diminuirTexto);
})
