if (!process.env.now) require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/userRoutes')
const progressRoutes = require('./src/routes/progressRoutes')
const tasksRoutes = require('./src/routes/tasksRoutes')
const publicRoutes = require('./src/routes/publicRoutes')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')

const app = express()
const port = process.env.now ? 8080 : 4000;

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({'secret': process.env.SECRET, resave: true, saveUninitialized: true}))
app.use(express.static('public'))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/onboarding", {useNewUrlParser: true})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));


userRoutes(app)
progressRoutes(app)
tasksRoutes(app)
publicRoutes(app)

app.listen(port);