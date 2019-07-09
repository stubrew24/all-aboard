const userForm = document.getElementById('userForm')
const usersTable = document.getElementById('usersTable')

const addUserToRow = (user) => {
    userRow = document.createElement('tr')
    userRow.id = user._id
    userRow.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.startDate.split('T')[0]}</td>
        <td>
            <button class='btn btn-sm btn-warning editbtn'>Update</button>
            <button class='btn btn-sm btn-danger delbtn'>Delete</button>
        </td>
        <td>
            ${user.started ? '<button class="btn btn-sm btn-info btn-block progressBtn">View Progress</button>' : '<button class="btn btn-sm btn-success btn-block onboardingBtn">Start Onboarding</button>'}
        </td>
    `
    const delbtn = userRow.querySelector('.delbtn')
    delbtn.addEventListener('click', () => {
        var confirm1 = confirm(`Are you sure you want to delete user '${user.firstName + ' ' + user.lastName}'`)
        if(confirm1){
            var confirm2 = confirm(`x users are currently working on this task. If you continue this will be permanently removed from their schedules.`)
            if(confirm2){
                remove(USERS_URL, user._id)
                userRow.remove()
            }
        }
    })
    const editbtn = userRow.querySelector('.editbtn')
    editbtn.addEventListener('click', () => {
        userForm.dataset.id = user._id
        userForm.formtype.value = "update"
        updateUserForm(user)
        showOne('displayUserForm')
    })

    if (userRow.querySelector('.progressBtn')){
        const progressBtn = userRow.querySelector('.progressBtn')
        progressBtn.addEventListener('click', () => {
            loadUserProgress(user._id)
            showOne('displayUserProgress')
        })
    }

    if (userRow.querySelector('.onboardingBtn')){
        const onboardingBtn = userRow.querySelector('.onboardingBtn')
        onboardingBtn.addEventListener('click', () => {
            startUserOnboarding(user)
        })
    }

    usersTable.appendChild(userRow)
}

const addUserRowsToTable = (users) => {
    users.forEach(addUserToRow)
}

const updateUserForm = (user) => {
    userForm.firstName.value = user.firstName
    userForm.lastName.value = user.lastName
    userForm.email.value = user.email
    userForm.startDate.value = user.startDate
}

const updateUser = () => {
    userId = userForm.dataset.id
    const updateduser = {
        firstName: userForm.firstName.value,
        lastName: userForm.lastName.value,
        email: userForm.email.value,
        startDate: userForm.startDate.value
    }
    console.log(updateduser)
    update(USERS_URL, userId, updateduser)
        .then(updateUserRow)
}

const updateUserRow = (user) => {
    userRow = document.getElementById(user._id)
    userRow.getElementsByTagName('td')[0].innerText = user.firstName
    userRow.getElementsByTagName('td')[1].innerText = user.lastName
    userRow.getElementsByTagName('td')[2].innerText = user.email
    userRow.getElementsByTagName('td')[3].innerText = user.startDate
}

const createUser = () => {
    const newUser = {
        firstName: userForm.firstName.value,
        lastName: userForm.lastName.value,
        email: userForm.email.value,
        startDate: userForm.startDate.value
    }
    create(USERS_URL, newUser)
        .then(addUserToRow)
    userForm.reset()
    showOne('displayUsers')
}

userFormSubmit = () => {
    userForm.addEventListener('submit', e => {
        e.preventDefault()
        if(userForm.formtype.value == 'new'){
            createUser()
        } else if (userForm.formtype.value == 'update'){
            updateUser()
        }
        userForm.reset()
    })
}