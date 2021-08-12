const choices = require("./choices")
const questions = require("./questions")
const quizzes = require("./quizzes")
const users = require("./users")

const { v4: uuidv4 } = require('uuid');

class Model {
    constructor(data) {
        this.values = data
    }

    create(item) {
        const id = uuidv4();
        this.values.push({
            id,
            ...item,
            access_token: '',
            type: ''
        })
        return this.values
    }
    getAll() {
        return this.values
    }
    findById(id) {
        return this.values.find(item => item.id === id)
    }

}

module.exports = {
    Choices: new Model(choices),
    Questions: new Model(questions),
    Quizzes: new Model(quizzes),
    Users: new Model(users)

}