const { allProgress, addProgress, showProgress, updateProgress, deleteProgress } = require('../controllers/progressController')

const routes = (app) => {
    app.route('/progress')
        .get(allProgress)
        .post(addProgress)

    app.route('/progress/:progressId')
        .get(showProgress)
        .put(updateProgress)
        .delete(deleteProgress)
}

module.exports = routes