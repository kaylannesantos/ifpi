document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('conteudo');
    let button = document.getElementById('buttonAdd');
    let select = document.getElementById('lista');

    button.addEventListener('click', () => {
        let texto = input.value.trim();
        if (texto !== '') {
            let option = document.createElement('option');
            option.textContent = texto;
            select.appendChild(option);
            input.value = '';
        }
        alert('O campo deve ser preenchido.');
    })
});
