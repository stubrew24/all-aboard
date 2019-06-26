import express from 'express'
import mongoose, { mongo } from 'mongoose'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes'
import progressRoutes from './src/routes/progressRoutes'
import tasksRoutes from './src/routes/tasksRoutes'

const app = express()
const PORT = 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://onboarding:VWWcppQ4dKgh6Krl@cluster0-fwofd.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

userRoutes(app)
progressRoutes(app)
tasksRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, console.log("Server running on port", PORT))