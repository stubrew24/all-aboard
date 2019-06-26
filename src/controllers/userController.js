const mongoose = require('mongoose')
const { UserSchema } = require('../models/userModel')

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
    User.findById({_id: req.params.userId}, (err, user) => {
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