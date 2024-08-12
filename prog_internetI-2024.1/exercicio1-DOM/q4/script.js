function limparConteudoParagrafo() {
    let paragrafo = document.getElementById('paragrafo');
    if (paragrafo) {
        paragrafo.textContent = '';//limpa o conteudo do paragrafo   
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let buttonLimparConteudo = document.getElementById('button-limparConteudo');

    if (buttonLimparConteudo) {
        buttonLimparConteudo.addEventListener('click', limparConteudoParagrafo);
    }
})
