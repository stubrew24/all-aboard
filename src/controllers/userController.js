const mongoose = require('mongoose')
const cron = require('node-cron')
const { UserSchema } = require('../models/userModel')
const { mailerTemplate } = require('../../mailer')

const User = mongoose.model('User', UserSchema)

export const getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const newUser = (req, res) => {
    let newUser = new User(req.body)

    newUser.save((err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const showUser = (req, res) => {
    User.findById({_id: req.params.userId}).populate({path: 'progress', select:['complete', 'dueDate'], populate: { path: 'task', select: 'name'}}).exec((err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const deleteUser = (req, res) => {
    User.findByIdAndDelete({_id: req.params.userId}, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(`User '${req.params.userId}' sucessfully removed.`)
    })
}

const userTasks = userId => {
    User.findById({_id: userId})
        .populate({
            path: 'progress', 
            select:['complete', 'dueDate'], 
            populate: { 
                path: 'task', 
                select: 'name'
            }
        })
        .exec((err, user) => {
            if (err) {
                console.log(err)
            } else {
                const outstanding = user.progress.filter(progress => {
                    const today = new Date()
                    if (progress.dueDate <= today && !progress.complete){
                        return progress
                    }
                })
                mailerTemplate(user.email, outstanding)
            }
        })
}

export const dailyMessages = () => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err)
        } else {
            users.forEach(user => userTasks(user._id))
        }
    })
}

cron.schedule("43 14 * * 3", () => {
    console.log("Cron running")
    dailyMessages()
})