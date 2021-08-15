const { Quizzes } = require('../models')

exports.getAll = (req, res) => {
    const quizzes = Quizzes.findAll()
    res.json(quizzes)
}

exports.getPublic = (req, res) => {
    const quizzes = Quizzes.findPublic()
    res.json(quizzes)
}

exports.getOneById = ({ params: { id } }, res) => {
    const quiz = Quizzes.findByPk(id)
    if (!quiz.length) {
        res.sendStatus(404)
        return;
    }
    res.json(quiz)
}

exports.createQuiz = ({ body: { name, type, userId } }, res) => {
    const item = Quizzes.create({ name, type, userId });
    res.json({ item })
}

exports.updateQuiz = ({ body: body, params: { id } }, res) => {
    const updatedQuiz = Quizzes.update(body, id);
    res.json(updatedQuiz)
}

exports.deleteQuiz = (req, res) => {
    const { id } = req.params
    Quizzes.destroy(id)
    res.sendStatus(200)
}