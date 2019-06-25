import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Please enter a first name.'
    },
    lastName: {
        type: String,
        required: 'Please enter a last name.'
    },
    email: {
        type: String,
        required: 'Please enter an email address.'
    },
    startDate: {
        type: Date,
        required: 'Please enter a start date.'
    },
})