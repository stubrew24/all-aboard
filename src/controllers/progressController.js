const mongoose = require('mongoose')
const { ProgressSchema } = require('../models/progressModel')
const { UserSchema } = require('../models/userModel')
const { TasksSchema } = require('../models/tasksModel')

const Task = mongoose.model('Task', TasksSchema)
const User = mongoose.model('User', UserSchema)
const Progress = mongoose.model('Progress', ProgressSchema)

export const allProgress = (req, res) => {
    Progress.find({}, (err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(progress)
    })
}

export const addProgress = async (req, res) => {
    let newProgress = new Progress(req.body)
    const task = await Task.findOne({ _id: req.body.taskId})

    newProgress.task = task

    newProgress.save((err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(progress)
    })
    
    const user = await User.findOne({ _id: newProgress.userId})

    user.progress.push(newProgress)
    user.save()
}

export const showProgress = (req, res) => {
    Progress.findById({_id: req.params.progressId}, (err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(progress)
    })
}

export const updateProgress = (req, res) => {
    Progress.findOneAndUpdate({_id: req.params.progressId}, req.body, {new: true}, (err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(progress)        
    })
}

export const deleteProgress = (req, res) => {
    Progress.remove({_id: req.params.progressId}, (err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(`Progress '${req.params.progressId}' successfully removed.`)  
    })
}