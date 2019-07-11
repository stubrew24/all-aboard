const userForm = document.getElementById('userForm')
const usersTable = document.getElementById('usersTable')
const alert = document.querySelector('.alert')

const userDeleteListener = (user, row) => e => {
    var confirm1 = confirm(`Are you sure you want to delete user '${user.firstName + ' ' + user.lastName}'`)
    if(confirm1){
        var confirm2 = confirm(`x users are currently working on this task. If you continue this will be permanently removed from their schedules.`)
        if(confirm2){
            remove(USERS_URL, user._id)
            row.remove()
        }
    }
}

const userUpdateListener = user => e => {
    userForm.dataset.id = user._id
    userForm.formtype.value = "update"
    document.getElementById('displayUserForm').querySelector('h4').innerText = "Update User"
    document.getElementById('displayUserForm').querySelector('.userSubmit').value = "Update User"
    updateUserForm(user)
    showOneUpdate('displayUserForm')
}

const progressListener = (user) => e => {
    loadUserProgress(user._id)
    showOne('displayUserProgress')
}

const userListeners = (user, row) => {
    const delbtn = row.querySelector('.delbtn')
    delbtn.addEventListener('click', userDeleteListener(user, row))

    const editbtn = row.querySelector('.editbtn')
    editbtn.addEventListener('click', userUpdateListener(user))

    if (row.querySelector('.progressBtn')){
        const progressBtn = row.querySelector('.progressBtn')
        progressBtn.addEventListener('click', progressListener(user))
    }
}

const addUserToRow = async (user) => {
    const userRow = document.createElement('tr')
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
    userListeners(user, userRow)

    if (userRow.querySelector('.onboardingBtn')) {

        const onboardingBtn = userRow.querySelector('.onboardingBtn')
        
        onboardingBtn.addEventListener('click', () => {
            startUserOnboarding(user)
            
            setTimeout(() => {
                list(USERS_URL)
                    .then(addUserRowsToTable)
                loadUserProgress(user._id)
                showOne('displayUserProgress')
            }, 100)
        })
    }

    usersTable.appendChild(userRow)
}

const addUserRowsToTable = (users) => {
    usersTable.innerHTML = ''
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
    update(USERS_URL, userId, updateduser)
        .then(updateUserRow)
    userForm.reset()
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
        .then(resp => {
            if (resp.error){
                console.log('error')
                alert.style.display = "block"
                alert.innerText = "User could not be saved: Email address already taked."
            } else {
                console.log('hmm')
                addUserToRow(resp)
                userForm.reset()
                showOne('displayUsers')
            }
        })
}

userFormSubmit = () => {
    userForm.addEventListener('submit', e => {
        e.preventDefault()
        if(userForm.formtype.value == 'new'){
            createUser()
        } else if (userForm.formtype.value == 'update'){
            updateUser()
        }
    })
}