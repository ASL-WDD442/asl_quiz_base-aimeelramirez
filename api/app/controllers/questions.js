const { Questions } = require('../models')

exports.getAll = async ({ query: { quizId } }, res, questions) => {
    switch (quizId) {
        case void 0:
            questions = await Questions.findAll()
            res.json(questions)
            break;
        case quizId:
            questions = await Questions.findAll({ where: { quizId } });
            res.json(questions)
            break;
        default:
            res.sendStatus(404)
            return;
    }
}

exports.getOneById = async ({ params: { id } }, res) => {
    const question = await Questions.findByPk(id)
    if (!question.length) {
        res.sendStatus(404)
        return;
    }
    res.json(question)
}


exports.createQuestion = async (req, res) => {
    const { title, quizId } = req.body;
    try {
        const newQuestion = await Questions.create({ title, quizId });
        res.json({ id: newQuestion.id });
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};

exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const [, [updatedQuestion]] = await Questions.update(req.body, {
            where: { id },
            returning: true,
        });
        res.json(updatedQuestion);
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    await Questions.destroy({ where: { id } });
    res.sendStatus(200);
};

// exports.createQuestion = async ({ body: { title, quizId } }, res) => {
//     const id = await Questions.create({ title, quizId })
//     res.json({ id })
// }

// exports.updateQuestion = ({ body: body, params: { id } }, res) => {
//     const updatedQuestion = Questions.update(body, id)
//     res.json(updatedQuestion)
//}
// exports.updateQuestion = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [, [updatedQuestion]] = await Questions.update(req.body, {
//             where: { id },
//             returning: true,
//         });
//         res.json(updatedQuestion);
//     } catch (e) {
//         const errors = e.errors.map((err) => err.message);
//         res.sendStatus(400).json({ errors });
//     }
// };

// exports.deleteQuestion = ({ params: { id } }, res) => {
//     Questions.destroy(id)
//     res.sendStatus(200)
// }