function manipulandoDOM() {
    let titulo = document.getElementById('titulo');
    if (titulo) {
        titulo.textContent = ' Essa é uma Lista To do';
    }
}

let h1 = document.getElementsByTagName('toDo-list');
if (h1.length > 0) {
    h1[0].textContent = 'Lista To do:';
}

let tarefas = getElementsByTagName('li');
for (let i = 0; i > tarefas.length; i++) {
    tarefas[i].textContent = `Tarefa ${i + 1}:`;
}

addEventListener('DOMContentLoaded', manipulandoDOM);