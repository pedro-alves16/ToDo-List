const inputTarefa = document.getElementById('input-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.querySelector('.lista-tarefas'); //ul

//

lookForTasks();

botaoAdicionar.addEventListener('click', (e) => {
    e.preventDefault();

    if(inputTarefa.value === '') return;

    criaTarefa();
    salvarTarefaNoBanco();

    inputTarefa.value = '';
})



inputTarefa.addEventListener('keypress', e => {
    
    if(e.code === 'Enter'){
        
    if(inputTarefa.value === '') return;

    criaTarefa();
    salvarTarefaNoBanco();

    inputTarefa.value = '';
    }
})

function criaTarefa(tarefa){
    const valorTarefa = inputTarefa.value;

    const li = document.createElement('li');
    li.classList.add('tarefas-item');
    li.innerHTML = ` <div> <input type = 'checkbox' class="input-caixa"><span>${valorTarefa}</span> </div> <button class="botao-apagar"> <img src="trash-2 (1).svg" alt=""> </button>`;
    
    listaTarefas.appendChild(li);
    lookForTasks();
}

listaTarefas.addEventListener('change', (e) => {
    if(e.target.type === 'checkbox'){
        const li = e.target.parentElement;
        
        if(e.target.checked){
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

    if(botaoClicado){
        botaoClicado.parentElement.remove();
        lookForTasks();
        salvarTarefaNoBanco();

    }
})

function salvarTarefaNoBanco(tarefaCriada) {

    const arrayLi = document.querySelectorAll('li');
    const tarefasDB = [];


    for (tarefa of arrayLi){
        const div = tarefa.querySelector('div');
        tarefasDB.push({
            task: tarefa.innerText,
            done: div.classList.contains('item-text')
        });

        
    }

    const tarefasJson = JSON.stringify(tarefasDB);
    localStorage.setItem('tarefa', tarefasJson);
}

function carregartarefasSalvas() {
    let tarefas = localStorage.getItem('tarefa');
    const listaTarefasSalvas = JSON.parse(tarefas);

    for (tarefa of listaTarefasSalvas){
    const li = document.createElement('li');
    li.classList.add('tarefas-item');
    li.innerHTML = ` <div> <input type = 'checkbox' class="input-caixa"><span>${tarefa.task}</span> </div> <button class="botao-apagar"> <img src="trash-2 (1).svg" alt=""> </button>`;

    const inputCaixa = li.querySelector('input');

    if(tarefa.done === true){
        inputCaixa.checked = true;
        li.classList.add('item-text');
    }
    listaTarefas.appendChild(li);
    lookForTasks();
    }
}

function lookForTasks(){ //verifica se existem itens dentro da lista e exibe a div de tarefa vazia
    const primeiroItem = listaTarefas.querySelector('li');
    console.log(primeiroItem);
    const nenhumaTarefa = document.querySelector('.tarefasVazias');

    if(primeiroItem){
        nenhumaTarefa.style.display = 'none'
    } else {
        nenhumaTarefa.style.display = 'block';
    }
}

carregartarefasSalvas();

