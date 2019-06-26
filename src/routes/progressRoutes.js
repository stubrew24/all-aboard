import { allProgress, addProgress, showProgress, updateProgress, deleteProgress } from "../controllers/progressController";

const routes = (app) => {
    app.route('/progress')
        .get(allProgress)
        .post(addProgress)

    app.route('/progress/:progressId')
        .get(showProgress)
        .put(updateProgress)
        .delete(deleteProgress)
}

export default routes