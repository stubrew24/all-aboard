import { home, login, register } from '../controllers/publicController'
const { loginRequired, logout } = require('../controllers/adminController')

const routes = (app) => {
    app.route('/')
        .get(loginRequired, home)

    app.route('/login')
        .get(login)

    app.route('/logout')
        .get(logout)
        
    app.route('/register')
        .get(register)
}

module.exports = routes