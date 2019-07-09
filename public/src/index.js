const progressList = document.getElementById('progressList')
const addUserForm = document.getElementById('addUserForm')

const hideAll = () => {
    document.querySelectorAll('.sections').forEach(section => section.style.display = "none")
}

const showAll = () => {
    document.querySelectorAll('.sections').forEach(section => section.style.display = "block")
}

const showOne = (section) => {
    hideAll()
    document.getElementById(section).style.display = "block"
}

// const displayItem = (item, list) => {
//     itemEl = document.createElement('li')
//     itemEl.id = item._id
//     itemEl.innerText = item.name || item.firstName || item._id
//     list.appendChild(itemEl)
// }

// const displayAllItems = (items, list) => {
//     items.forEach(item => displayItem(item, list))
// }



const initialize = () => {
    taskFormSubmit()
    userFormSubmit()
    
    list(TASKS_URL)
        .then(addTaskRowsToTable)
    list(USERS_URL)
        .then(addUserRowsToTable)
}

initialize()