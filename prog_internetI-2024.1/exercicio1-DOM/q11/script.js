document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('conteudo');
    let button = document.getElementById('buttonAdd');
    let ul = document.getElementById('lista');

    button.addEventListener('click', () => {
        let texto = input.value.trim();
        if (texto !== '') {
            let item = document.createElement('li');
            item.textContent = texto;
            ul.appendChild(item);
            input.value = '';
        }
    })
});
