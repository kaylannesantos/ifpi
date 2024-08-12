function aumentarTexto(){
    document.body.style.fontSize = 'larger';
}

function diminuirTexto(){
    document.body.style.fontSize = 'medium';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button-max').addEventListener('click',aumentarTexto);
    document.getElementById('button-min').addEventListener('click',diminuirTexto);
});