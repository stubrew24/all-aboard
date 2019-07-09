const taskForm = document.getElementById('taskForm')
const tasksTable = document.getElementById('tasksTable')


const addTaskToRow = (task) => {
    const taskRow = document.createElement('tr')
    taskRow.id = task._id
    
    taskRow.innerHTML = `
    <td>${task.name}</td>
    <td>${task.description}</td>
    <td>${task.link}</td>
    <td>${task.dayDue}</td>
    <td>${task.weekDue}</td>
    <td>${task.active ? '<div id="activebtn" class="active"></div>' : '<div id="activebtn" class="inactive"></div>'}</td>
    <td>
        <button class='btn btn-sm btn-warning editbtn'>Update</button>
        <button class='btn btn-sm btn-danger delbtn'>Delete</button>
    </td>
    `
    const delbtn = taskRow.querySelector('.delbtn')
    delbtn.addEventListener('click', () => {
        var confirm1 = confirm(`Are you sure you want to delete task '${task.name}'`)
        if(confirm1){
            var confirm2 = confirm(`x users are currently working on this task. If you continue this will be permanently removed from their schedules.`)
            if(confirm2){
                remove(TASKS_URL, task._id)
                taskRow.remove()
            }
        }
    })
    const editbtn = taskRow.querySelector('.editbtn')
    editbtn.addEventListener('click', () => {
        taskForm.dataset.id = task._id
        taskForm.formtype.value = "update"
        updateForm(task)
        showOne('displayTaskForm')
    })
    
    const activebtn = taskRow.querySelector('#activebtn')
    activebtn.addEventListener('click', () => {
        if (activebtn.className == 'active'){
            update(TASKS_URL, task._id, {active: false})
            activebtn.className = 'inactive'
        } else if (activebtn.className == 'inactive'){
            update(TASKS_URL, task._id, {active: true})
            activebtn.className = 'active'
        }
    })
    
    tasksTable.appendChild(taskRow)
}

const addTaskRowsToTable = (tasks) => {
    tasks.forEach(addTaskToRow)
}

const createTask = () => {
    const newTask = {
        name: taskForm.name.value,
        description: taskForm.description.value,
        link: taskForm.link.value,
        dayDue: taskForm.dayDue.value,
        weekDue: taskForm.weekDue.value
    }
    create(TASKS_URL, newTask)
        .then(addTaskToRow)
}

const updateForm = (task) => {
    taskForm.name.value = task.name
    taskForm.description.value = task.description
    taskForm.link.value = task.link
    taskForm.dayDue.value = task.dayDue
    taskForm.weekDue.value = task.weekDue
}

const updateTask = () => {
    taskId = taskForm.dataset.id
    const updatedTask = {
        name: taskForm.name.value,
        description: taskForm.description.value,
        link: taskForm.link.value,
        dayDue: taskForm.dayDue.value,
        weekDue: taskForm.weekDue.value
    }
    update(TASKS_URL, taskId, updatedTask)
        .then(updateTaskRow)
}

const updateTaskRow = (task) => {
    taskRow = document.getElementById(task._id)
    taskRow.getElementsByTagName('td')[0].innerText = task.name
    taskRow.getElementsByTagName('td')[1].innerText = task.description
    taskRow.getElementsByTagName('td')[2].innerText = task.link
    taskRow.getElementsByTagName('td')[3].innerText = task.weekDue
    taskRow.getElementsByTagName('td')[4].innerText = task.dayDue
}

taskFormSubmit = () => {
    taskForm.addEventListener('submit', e => {
        e.preventDefault()
        if(taskForm.formtype.value == 'new'){
            createTask()
        } else if (taskForm.formtype.value == 'update'){
            updateTask()
        }
        taskForm.reset()
        showOne('displayTasks')
    })
}
