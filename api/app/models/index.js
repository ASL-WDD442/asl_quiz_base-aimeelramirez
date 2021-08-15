const { v4: uuidv4, v1: uuidv1 } = require('uuid')
const quizzes = require('./quizzes')
const questions = require('./questions')
const choices = require('./choices')
const users = require('./auths');
const token = uuidv1();

class Model {
    constructor(data) {
        this.values = data
    }

    create(item) {
        const id = uuidv4();
        this.values.push({
            id: id,
            ...item

        })
        return id
    }
    createAUser(item) {
        const id = uuidv4();
        this.values.push({
            id: id,
            ...item,
            access_token: token,
            type: ""

        })
        return id
    }
    update(valuesToChange, id) {
        const index = this.values.findIndex(item => item.id === id)
        const newValue = { ...this.values[index], ...valuesToChange }
        this.values = [
            ...this.values.slice(0, index),
            newValue,
            ...this.values.slice(index + 1)
        ]
        return newValue
    }

    destroy(id) {
        this.values = this.values.filter((item) => {
            if (item.id === id) return false
            return true
        })
    }

    findByPk(id) {
        return this.values.filter(item => item.id === id)
    }

    getLogin(user) {
        return this.values.filter(item => item.username === user.username && item.password === user.password)
    }
    findByToken(target) {
        const newToken = uuidv1();
        return this.values.filter(item => {
            if (item.username === target.username) {
                //Change temp code for access_code/access_token
                item.access_token = newToken
                return item
            }
        })
    }
    findByQuiz(id) {
        return this.values.filter(item => item.quizId === id)
    }

    findByQuestion(id) {
        return this.values.filter(item => item.questionId === id)
    }

    findPublic() {
        return this.values.filter(item => item.type === 'public')
    }

    findAll() {
        return this.values
    }
}

module.exports = {
    Users: new Model(users),
    Quizzes: new Model(quizzes),
    Questions: new Model(questions),
    Choices: new Model(choices)

}