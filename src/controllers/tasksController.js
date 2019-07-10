const mongoose = require('mongoose')
const { TasksSchema } = require('../models/tasksModel')

const Task = mongoose.model('Task', TasksSchema)

export const getTasks = (req, res) => {
    Task.find({}, (err, task) => {
        if(err){
            res.send(err)
        }
        res.json(task)
    })
}

export const addTask = (req, res) => {
    let newTask = new Task(req.body)

    newTask.save((err, task) => {
        if(err){
            res.send(err)
        }
        res.json(task)
    })
}

export const showTask = (req, res) => {
    Task.findById({_id: req.params.taskId}, (err, task) => {
        if(err){
            res.send(err)
        }
        res.json(task)
    })
}

export const updateTask = (req, res) => {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, task) => {
        if(err){
            res.send(err)
        }
        res.json(task)
    })
}

export const deleteTask = (req, res) => {
    Task.remove({_id: req.params.taskId}, (err, task) => {
        if(err){
            res.send(err)
        }
        res.json(`Task '${req.params.taskId}' successfully  removed.`)
    })
}
