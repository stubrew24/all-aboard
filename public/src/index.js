const progressList = document.getElementById('progressList')
const addUserForm = document.getElementById('addUserForm')

const hideAll = () => {
    document.querySelector('.alert').style.display = "none"
    document.querySelector('.hero-img').style.display = "none"
    document.querySelectorAll('.sections').forEach(section => section.style.display = "none")
}

const showAll = () => {
    document.querySelectorAll('.sections').forEach(section => section.style.display = "block")
}

const showOne = (section) => {
    resetForms()
    hideAll()
    document.getElementById(section).style.display = "block"
}

const showOneUpdate = (section) => {
    hideAll()
    document.getElementById(section).style.display = "block"
}

const resetForms = () => {
    document.getElementById('taskForm').dataset.id = null
    document.getElementById('taskForm').formtype.value = ''
    document.getElementById('taskForm').reset()
    document.getElementById('userForm').dataset.id = null
    document.getElementById('userForm').formtype.value = ''
    document.getElementById('userForm').reset()

    document.getElementById('displayTaskForm').querySelector('h4').innerText = "Add Task"
    document.getElementById('displayTaskForm').querySelector('.taskSubmit').value = "Add Task"
    document.getElementById('displayUserForm').querySelector('h4').innerText = "Add User"
    document.getElementById('displayUserForm').querySelector('.userSubmit').value = "Add User"
}


const initialize = () => {
    taskFormSubmit()
    userFormSubmit()
    
    list(TASKS_URL)
        .then(addTaskRowsToTable)
    list(USERS_URL)
        .then(addUserRowsToTable)
}

initialize()