const { Choices } = require('../models')

//{ query: { questionId } } eq req.query.questionId
exports.getAll = async ({ query: { questionId } }, res, choices) => {
    switch (questionId) {
        case void 0:
            choices = await Choices.findAll()
            res.json(choices)
            break;
        case questionId:
            choices = await Choices.findAll({ where: { questionId } });
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

// exports.createChoice = ({ body: { value, type, questionId } }, res) => {
//     const id = Choices.create({ value, type, questionId });
//     res.json(id)
// }

// exports.updateChoice = ({ params: { id }, body: body }, res) => {
//     const updatedChoice = Choices.update(body, id);
//     res.json(updatedChoice)
// }

// exports.deleteChoice = ({ params: { id } }, res) => {
//     Choices.destroy(id);
//     res.sendStatus(200)
// }

exports.createChoice = async (req, res) => {
    const { value, type, questionId } = req.body;
    try {
        const newChoice = await Choices.create({ value, type, questionId });
        res.json({ id: newChoice.id });
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};

exports.updateChoice = async (req, res) => {
    const { id } = req.params;
    try {
        const [, [updatedChoice]] = await Choices.update(req.body, {
            where: { id },
            returning: true,
        });
        res.json(updatedChoice);
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};

exports.deleteChoice = async (req, res) => {
    const { id } = req.params;
    await Choices.destroy({ where: { id } });
    res.sendStatus(200);
};
