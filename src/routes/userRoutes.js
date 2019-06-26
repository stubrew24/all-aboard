const { getUsers, newUser, showUser, updateUser, deleteUser } = require('../controllers/userController')

const routes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(newUser)

    app.route('/users/:userId')
        .get(showUser)
        .put(updateUser)
        .delete(deleteUser)
}

module.exports = routes