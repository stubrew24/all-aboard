const mongoose = require('mongoose')

const Schema = mongoose.Schema

export const ProgressSchema = new Schema({
    userId: {
        type: String,
        required: 'User required.'
    },
    taskId: {
        type: String,
        required: 'Task required.'
    },
    dueDate: {
        type: Date,
        required: 'Due date required.'
    },
    complete: {
        type: Boolean,
        default: false
    },
    task: { type: Schema.Types.ObjectId, ref: 'Task' }
})