const progressList = document.getElementById('progressList')
const addUserForm = document.getElementById('addUserForm')

const hideAll = () => {
    document.querySelector('.hero-img').style.display = "none"
    document.querySelectorAll('.sections').forEach(section => section.style.display = "none")
}

const showAll = () => {
    document.querySelectorAll('.sections').forEach(section => section.style.display = "block")
}

const showOne = (section) => {
    hideAll()
    document.getElementById(section).style.display = "block"
}

const resetForms = (formId) => {
    document.getElementById(formId).dataset.id = null
    document.getElementById(formId).formtype.value = ''
    document.getElementById(formId).reset()
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