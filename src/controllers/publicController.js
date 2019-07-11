const path = require('path')

export const home = (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/index.html'))
}

export const loggedin = (req, res) => {
    res.send('You are logged in')
}

export const login = (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/login.html'))
}

export const register = (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/register.html'))
}