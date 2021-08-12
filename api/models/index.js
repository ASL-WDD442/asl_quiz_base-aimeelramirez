const choices = require("./choices")
const questions = require("./questions")
const quizzes = require("./quizzes")
const users = require("./users")

const uuid = require('uuid')

class Model {
    constructor(data) {
        this.values = data
    }

    create(item) {
        const id = uuid()
        this.values.push({ id, ...item })
        return id
    }
    getAll() {
        console.log('getting.')
        return this.values
    }

}

module.exports = {
    Choices: new Model(choices),
    Questions: new Model(questions),
    Quizzes: new Model(quizzes),
    Users: new Model(users)

}