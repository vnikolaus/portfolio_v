const field = document.querySelector('.inputTask');
const btn = document.querySelector('.addTask');
const ul = document.querySelector('.tasks');
let keypress = field.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if (!field.value) return false;
        newTask(field.value);
        clearField()
    }
});

function createList() {
    const li = document.createElement('li');
    return li;
}

function newTask(input) {
    const li = createList();
    li.innerText = input;
    ul.appendChild(li); 
    clearField();
    deleteBtn(li);
    saveData();
}

function clearField() {
    field.value = '';
    field.focus(); 
}

function deleteBtn(li) {
    li.innerHTML += '  ';
    const btn = document.createElement('button');
    btn.innerText = "Apagar";
    btn.setAttribute('class', 'deleteTask'); 
    li.appendChild(btn);
}

function saveData() {
    const liTasks = ul.querySelectorAll('li');
    const arrTask = []

    for (let text of liTasks) {
        let txt = text.innerText;
        txt = txt.replace('Apagar', '').trim();
        arrTask.push(txt);
    }

    const taskJSON = JSON.stringify(arrTask); 

    localStorage.setItem('tasks', taskJSON); 
}

function addSaveTask() {
    const saveTasks = localStorage.getItem('tasks'); 
    const arrTasks = JSON.parse(saveTasks); 

    for (let task of arrTasks) {
        newTask(task);
    }
}

btn.addEventListener('click', (e) => {
    if (!field.value) return false;
    newTask(field.value);
});

document.addEventListener('click', (e) => {
    let el = e.target;
    if (el.classList.contains('deleteTask')) {
        el.parentElement.remove(); 
        saveData(); 
    }
})

addSaveTask();
