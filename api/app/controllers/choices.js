const { Choices } = require('../models')

//{ query: { questionId } } eq req.query.questionId
exports.getAll = ({ query: { questionId } }, res, choices) => {
    switch (questionId) {
        case void 0:
            choices = Choices.findAll()
            res.json(choices)
            break;
        case questionId:
            choices = Choices.findByQuestion(questionId)
            res.json(choices)
            break;
        default:
            res.sendStatus(404)
            return;
    }
}

exports.getOneById = ({ params: { id } }, res) => {
    const choice = Choices.findByPk(id)
    if (!choice.length) {
        res.sendStatus(404); return;
    }
    res.json(choice);

}

exports.createChoice = ({ body: { value, type, questionId } }, res) => {
    const id = Choices.create({ value, type, questionId });
    res.json(id)
}

exports.updateChoice = ({ params: { id }, body: body }, res) => {
    const updatedChoice = Choices.update(body, id);
    res.json(updatedChoice)
}

exports.deleteChoice = ({ params: { id } }, res) => {
    Choices.destroy(id);
    res.sendStatus(200)
}