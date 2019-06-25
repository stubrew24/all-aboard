import express from 'express'
import mongoose, { mongo } from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/onboarding', {useNewUrlParser: true})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, console.log("Server running on port", PORT))