const BASE_URL = "http://localhost:4000/"

const USERS_URL = BASE_URL + "users"
const PROGRESS_URL = BASE_URL + "progress"
const TASKS_URL = BASE_URL + "tasks"

const list = (url) => {
    return fetch(url)
        .then(resp => resp.json())
}

const show = (url, id) => {
    return fetch(url + `/${id}`)
        .then(resp => resp.json())
}

const create = (url, bodyObj) => {
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(bodyObj)
    })
    .then(resp => resp.json())
}

const update = (url, id, bodyObj) => {
    return fetch(url + `/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(bodyObj)
    })
    .then(resp => resp.json())
}

const remove = (url, id) => {
    return fetch(url + `/${id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
}