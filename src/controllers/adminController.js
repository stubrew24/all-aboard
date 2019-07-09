import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AdminSchema } from '../models/adminModel'

const Admin = mongoose.model('Admin', AdminSchema)

export const register = (req, res) => {
    const newAdmin = new Admin(req.body)
    newAdmin.hashPassword = bcrypt.hashSync(req.body.password, 10)
    newAdmin.save((err, admin) => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        } else {
            admin.hashPassword = undefined
            return res.json(admin)
        }
    })
}

export const login = (req, res) => {
    Admin.findOne({
        username: req.body.username
    }, (err, admin) => {
        console.log(admin)
        if (err) throw err
        if (!admin) {
            res.status(401).json({message: 'Authentication failed. No user found with those credentials.'})
        } else {
            if (!admin.comparePassword(req.body.password, admin.hashPassword)) {
                res.status(401).json({message: 'Authentication failed. No user found with those credentials.'})     
            } else {
                req.session.admin = true
                req.session.credentials = ({token: jwt.sign({username: admin.username, _id: admin.id}, 'RESTFULAPIs')})
                res.redirect('/')
            }
        }
    })
}

export const loginRequired = (req, res, next) => {
    if (req.session.admin && req.session.credentials) {
        next()
    } else {
        res.redirect('/login')
    }
}

export const logout = (req, res, next) => {
    req.session.admin = undefined
    req.session.credentials = undefined
    res.redirect('/login')
}