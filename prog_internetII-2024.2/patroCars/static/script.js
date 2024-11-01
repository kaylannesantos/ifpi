function verificarAnoFundacao() {
    const input = document.getElementById("ano_fundacao");
    const aviso = document.getElementById("aviso");

    // Converte o valor para número e verifica se é um número inteiro
    const valor = parseFloat(input.value);
    if (!Number.isInteger(valor)) {
        aviso.textContent = "Por favor, insira um número inteiro.";
    } else {
        aviso.textContent = ""; // Limpa a mensagem de erro
    }
}