const nodemailer = require('nodemailer')
const { userTasks } = require('./src/controllers/userController')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stuart.sewell@flatironschool.com',
        pass: 'knhvpyxtmdkceywb'
    }
})

const mailOptions = (to, content) => {
    return {
        from: 'All Aboard<allaboard@flatironschool.com>',
        to: to,
        subject: 'Daily Tasks',
        html: content
    }
}

export const mailer = (to, content) => {
    return transporter.sendMail(mailOptions(to, content), (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent:', info.response)
        }
    })
}

export const mailerTemplate = (email, tasks) => {
    let template = ''

    template += '<h1>Tasks Due</h1>'
    template += '<ul>'
    tasks.forEach(task => {
        template += `<li>${task.task.name} - ${task.dueDate}</li>`
    })
    template += '</ul>'

    mailer(email, template)
}
