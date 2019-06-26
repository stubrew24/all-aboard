import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ProgressSchema = new Schema({
    userId: {
        type: Number,
        required: 'User required.'
    },
    taskId: {
        type: Number,
        required: 'Task required.'
    },
    dueDate: {
        type: Date,
        required: 'Due date required.'
    },
    complete: {
        type: Boolean,
        default: false
    }
})