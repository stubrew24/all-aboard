const nameContainer = document.querySelector('#userName')
const progressContainer = document.querySelector('#userProgress')
const progressBtn = document.querySelector('#progressBtn')
const progressTable = document.querySelector('#progressTable')

const displayUserProgress = user => {
    nameContainer.innerText = user.firstName + ' ' + user.lastName
    progressTable.innerHTML = ''
    user.progress.forEach(progress => {
        const row = document.createElement('tr')
        row.innerHTML = `<td>${progress.task.name}</td><td>${progress.dueDate.split('T')[0]}</td><td>${progress.complete ? '<i class="material-icons">check</i>' : '<i class="material-icons">close</i>'}</td>`
        progressTable.append(row)
    })
    sendToSlack(jason)

}

const loadUserProgress = user_id => {
    show(USERS_URL, user_id)
        .then(displayUserProgress)      
}

const startUserOnboarding = user => {
    list(TASKS_URL).then(tasks => {
        tasks.forEach(task => {
            if(task.active){
                const dueDate = getDueDate(user.startDate, task.weekDue, task.dayDue)
                create(PROGRESS_URL, {userId: user._id, taskId: task._id, dueDate})
            }
        })
        update(USERS_URL, user._id, {started: true})
            .then(console.log)
    })
}

const getDueDate = (userStartDate, weekDue, dayDue) => {
    days = ((weekDue-1)*7) + dayDue
	startdate = new Date(userStartDate)
	dueDate = startdate.setDate(startdate.getDate() + days)
	return new Date(dueDate)
}

const sendToSlack = (bodyObject) => {
    fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        body: JSON.stringify(bodyObject)
    })
}


const jason = [
    {
		text: {
			type: "mrkdwn",
			text: "Hello, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*"
		}
    }
]
