const { getUsers, newUser, showUser, updateUser, deleteUser } = require('../controllers/userController')
const { register, login, loginRequired } = require('../controllers/adminController')

const routes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(newUser)

    app.route('/users/:userId')
        .get(showUser)
        .put(updateUser)
        .delete(deleteUser)

    app.route('/auth/register')
        .post(register)

    app.route('/auth/login')
        .post(login)
}

module.exports = routes