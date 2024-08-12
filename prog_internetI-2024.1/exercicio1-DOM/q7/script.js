function converterTexto() {
    let texto = document.getElementById('textoMinusculo').value;
    let textoCaixaAlta = texto.toUpperCase();

    let divCaixaAlta = document.getElementById('caixaAlta');
    divCaixaAlta.textContent = textoCaixaAlta;
}

document.addEventListener('DOMContentLoaded', () => {
    let botaoConverterTexto = document.getElementById('button-converterTexto');

    if (botaoConverterTexto) {
        botaoConverterTexto.addEventListener('click', converterTexto);
    }
});