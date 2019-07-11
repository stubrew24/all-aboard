const mongoose = require('mongoose')

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
        required: 'Please enter an email address.',
        unique: true
    },
    startDate: {
        type: Date,
        required: 'Please enter a start date.'
    },
    started: {
        type: Boolean,
        default: false
    },
    progress: [{ type: Schema.Types.ObjectId, ref: 'Progress' }]
})