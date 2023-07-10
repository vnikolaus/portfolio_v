import { ElementsType } from './types/elementsType'
import { TaskType } from './types/taskType'

const listTask = document.getElementById('list') as HTMLDivElement
const addTaskButton = document.getElementById('create') as HTMLButtonElement

let tasks: TaskType[] = []

addTaskButton.addEventListener('click', CreateNewTask)

function CreateNewTask(): void {
    const task: TaskType = {
        id: new Date().getTime(),
        content: '',
        complete: false,
    }

    tasks.unshift(task)

    const { taskDiv, taskInput } = setTaskElements(task)

    listTask.prepend(taskDiv)

    taskInput.removeAttribute('disabled')
    taskInput.focus()

    save()
}

function setTaskElements(task: TaskType): ElementsType {
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('item')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.complete

    if (task.complete) {
        taskDiv.classList.add('complete')
    }

    const taskInput = document.createElement('input')
    taskInput.type = 'text'
    taskInput.value = task.content
    taskInput.setAttribute('disabled', '')

    const actions = document.createElement('div')
    actions.classList.add('actions')

    const editButton = document.createElement('button')
    editButton.classList.add('material-icons')
    editButton.innerText = 'edit'

    const removeButton = document.createElement('button')
    removeButton.classList.add('material-icons', 'remove-btn')
    removeButton.innerText = 'remove_circle'

    actions.append(editButton)
    actions.append(removeButton)

    taskDiv.append(checkbox)
    taskDiv.append(taskInput)
    taskDiv.append(actions)

    //Events
    checkbox.addEventListener('change', () => {
        task.complete = checkbox.checked

        task.complete
            ? taskDiv.classList.add('complete')
            : taskDiv.classList.remove('complete')

        save()
    })

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            task.content = taskInput.value
            taskInput.setAttribute('disabled', '')
            save()
        }
    })

    taskInput.addEventListener('input', () => {
        task.content = taskInput.value
    })

    taskInput.addEventListener('blur', () => {
        taskInput.setAttribute('disabled', '')
        save()
    })

    editButton.addEventListener('click', () => {
        taskInput.removeAttribute('disabled')
        taskInput.focus()
    })

    removeButton.addEventListener('click', () => {
        tasks = tasks.filter((tsk) => tsk.id != task.id)

        taskDiv.remove()

        save()
    })

    return { taskDiv, taskInput }
}

function displayTasks() {
    load()

    for (const i in tasks) {
        const item = tasks[i]

        const { taskDiv } = setTaskElements(item)

        listTask.append(taskDiv)
    }
}

function save() {
    const save = JSON.stringify(tasks)

    localStorage.setItem('my_tasks', save)
}

function load() {
    const data = localStorage.getItem('my_tasks')

    if (data) {
        tasks = JSON.parse(data)
    }
}

displayTasks()
