if (!process.env.now) require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/userRoutes')
const progressRoutes = require('./src/routes/progressRoutes')
const tasksRoutes = require('./src/routes/tasksRoutes')
const helmet = require('helmet')
const cors = require('cors')

const app = express()
const port = process.env.now ? 8080 : 4000;

console.log(userRoutes)

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/onboarding", {useNewUrlParser: true})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));


userRoutes(app)
progressRoutes(app)
tasksRoutes(app)

app.get('/', (req, res) => {
    res.redirect("https://github.com/stubrew24/onboarding-api")
})

app.listen(port);