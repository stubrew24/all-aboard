import mongoose from 'mongoose'
import { UserSchema } from '../models/userModel'

const User = mongoose.model('User', UserSchema)

export const getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}