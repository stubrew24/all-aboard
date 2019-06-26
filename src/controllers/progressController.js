const mongoose = require('mongoose')
const { ProgressSchema } = require('../models/progressModel')

const Progress = mongoose.model('Progress', ProgressSchema)

export const allProgress = (req, res) => {
    Progress.find({}, (err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(progress)
    })
}

export const addProgress = (req, res) => {
    let newProgress = new Progress(req.body)

    newProgress.save((err, progress) => {
        if (err) {
            res.send(err)
        }
        res.json(progress)
    })
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