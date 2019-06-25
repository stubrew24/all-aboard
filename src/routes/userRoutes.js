import { getUsers, newUser, showUser, updateUser, deleteUser } from '../controllers/userController'

const routes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(newUser)

    app.route('/users/:userId')
        .get(showUser)
        .put(updateUser)
        .delete(deleteUser)
}

export default routes