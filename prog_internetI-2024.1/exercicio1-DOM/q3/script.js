function contarParagrafos () {
    let texto = document.getElementById('texto');
    let resultado = document.getElementById('resultado');

    if (texto && resultado) {
        let quantidade = texto.getElementsByTagName('p').length;
        resultado.textContent = `Número de parágrafos: ${quantidade}`;        
    }
}

document.addEventListener('DOMContentLoaded', contarParagrafos);