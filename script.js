const inputTarefa = document.getElementById('input-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.querySelector('.lista-tarefas'); //ul
//

lookForTasks();

botaoAdicionar.addEventListener('click', (e) => {
    const valorTarefa = inputTarefa.value;
    e.preventDefault();

    if (inputTarefa.value === '') return;
    criaTarefa(valorTarefa);
    salvarTarefaNoBanco();

    inputTarefa.value = '';
})



inputTarefa.addEventListener('keypress', e => {
    const valorTarefa = inputTarefa.value;
    if (e.code === 'Enter') {

        if (inputTarefa.value === '') return;

        criaTarefa(valorTarefa);
        salvarTarefaNoBanco();

        inputTarefa.value = '';
    }
})

function criaTarefa(ConteudoTarefa) {

    const li = document.createElement('li');
    li.classList.add('tarefas-item');
    li.innerHTML = ` <div> <input type = "checkbox" class="input-caixa"><span>${ConteudoTarefa}</span> </div> <button class="botao-apagar"> <img src="/assets/trash-2 (1).svg" alt=""> </button>`;

    listaTarefas.appendChild(li);
    lookForTasks();

    return li;
}

document.addEventListener('change', (e) => {

    const checkBox = e.target

    if (checkBox.type === 'checkbox') {
        const li = e.target.closest('li')
        if (e.target.checked) {
            li.classList.add('item-text');

            salvarTarefaNoBanco();
            
        } else {
            li.classList.remove('item-text');

            salvarTarefaNoBanco();
            lookForTasks();
        }

        lookForTasks();

    }
})

listaTarefas.addEventListener('click', e => {
    const botaoClicado = e.target.closest('.botao-apagar');

    if (botaoClicado) {
        botaoClicado.parentElement.remove();
        lookForTasks();
        salvarTarefaNoBanco();

    }
})

function salvarTarefaNoBanco(tarefaCriada) {

    const arrayLi = document.querySelectorAll('li');
    const tarefasDB = [];


    for (const tarefa of arrayLi) {

        tarefasDB.push({
            task: tarefa.innerText,
            done: tarefa.classList.contains('item-text')
        });
    }

    const tarefasJson = JSON.stringify(tarefasDB);
    localStorage.setItem('tarefa', tarefasJson);
}

function carregartarefasSalvas() {
    let tarefas = localStorage.getItem('tarefa');

    const listaTarefasSalvas = JSON.parse(tarefas);

    for (const tarefa of listaTarefasSalvas) {

        const li = criaTarefa(tarefa.task);

        const inputCaixa = li.querySelector('input');

        if (tarefa.done === true) {
            inputCaixa.checked = true;
            li.classList.add('item-text');
        }
        listaTarefas.appendChild(li);
        lookForTasks();
    }
}

function lookForTasks() { //verifica se existem itens dentro da lista e exibe a div de tarefa vazia
    const primeiroItem = listaTarefas.querySelector('li');
    const nenhumaTarefa = document.querySelector('.tarefasVazias');

    if (primeiroItem) {
        nenhumaTarefa.style.display = 'none'
    } else {
        nenhumaTarefa.style.display = 'block';
    }
}

carregartarefasSalvas();

