import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TasksSchema = new Schema({
    name: {
        type: String,
        required: 'Task name required.'
    },
    description: {
        type: String,
        required: 'Task description required.'
    }, 
    link: {
        type: String
    },
    weekDue: {
        type: Number,
        required: 'Week due required.'
    },
    dayDue: {
        type: Number,
        required: 'Day due required.'
    },
    active: {
        type: Boolean,
        default: false
    }
})