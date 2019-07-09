import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

export const AdminSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        required: true
    }
})

AdminSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}