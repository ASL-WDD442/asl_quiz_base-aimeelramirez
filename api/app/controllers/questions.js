const { Questions } = require('../models')

exports.getAll = ({ query: { quizId } }, res, questions) => {
    switch (quizId) {
        case void 0:
            questions = Questions.findAll()
            res.json(questions)
            break;
        case quizId:
            questions = Questions.findByQuiz(quizId)
            res.json(questions)
            break;
        default:
            res.sendStatus(404)
            return;
    }
}

exports.getOneById = ({ params: { id } }, res) => {
    const question = Questions.findByPk(id)
    if (!question.length) {
        res.sendStatus(404)
        return;
    }
    res.json(question)
}

exports.createQuestion = ({ body: { title, quizId } }, res) => {
    const id = Questions.create({ title, quizId })
    res.json({ id })
}

exports.updateQuestion = ({ body: body, params: { id } }, res) => {
    const updatedQuestion = Questions.update(body, id)
    res.json(updatedQuestion)
}

exports.deleteQuestion = ({ params: { id } }, res) => {
    Questions.destroy(id)
    res.sendStatus(200)
}