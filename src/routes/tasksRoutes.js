const { getTasks, addTask, showTask, deleteTask, updateTask } = require('../controllers/tasksController')

const routes = (app) => {
    app.route('/tasks')
        .get(getTasks)
        .post(addTask)
        
    app.route('/tasks/:taskId')
        .get(showTask)
        .put(updateTask)
        .delete(deleteTask)
}

module.exports = routes