import express from 'express'
import mongoose, { mongo } from 'mongoose'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes'

const app = express()
const PORT = 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/onboarding', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

userRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, console.log("Server running on port", PORT))