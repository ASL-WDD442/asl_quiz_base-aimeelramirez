// const { Quizzes } = require('../.models')
const { Quizzes } = require('../models')
const { validate, version } = require('uuid');

exports.getAll = async (req, res) => {
    const quizzes = await Quizzes.findAll()
    console.log(quizzes)
    res.json(quizzes)

}

exports.getPublic = async (req, res) => {
    const quizzes = await Quizzes.findAll({ where: { type: 'public' } });
    res.json(quizzes);
};

exports.getOneById = async ({ params: { id } }, res) => {
    // console.log("This is get one ", id)
    const quiz = await Quizzes.findByPk(id);
    if (!quiz) {
        res.sendStatus(404);
        return;
    }
    res.json(quiz);
}
exports.deleteQuiz = async (req, res) => {
    const { id } = req.params;
    await Quizzes.destroy({ where: { id } });
    res.sendStatus(200);
};

exports.createQuiz = async (req, res) => {
    const { quiz: { name, type, userId } } = req.body;
    try {
        const newQuiz = await Quizzes.create({ name, type, userId });
        res.json({ id: newQuiz.id, name: name, type: type, userId: userId });
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};

exports.updateQuiz = async (req, res) => {
    const { id } = req.params;
    // const { id: id, name: name, type: type, userId: userId } = req.body.quiz
    // console.log("REQ update quiz:", id)
    // console.log(version(id));
    // if (version(id) === 4) {
    try {
        const [, [updatedQuiz]] = await Quizzes.update(req.body.quiz, {
            where: { id },
            returning: true,
        });
        console.log("REQ update quiz:", [, [updatedQuiz]])

        res.json(updatedQuiz);
    }
    catch (err) {
        // const errors = e.errors.map((err) => err.message);
        // res.sendStatus(400).json({ errors });
        console.log(err);
        res.sendStatus(500);
        return;
    }
    // }
    // else {
    //     console.log("Uuid")
    // }
};

// exports.deleteQuiz = (req, res) => {
//     const { id } = req.params;
//     Quizzes.destroy({ where: { id } });
//     res.sendStatus(200);
// };
// exports.createQuiz = ({ body: { name, type, userId } }, res) => {
//     const item = Quizzes.create({ name, type, userId });
//     res.json({ item })
// }

// exports.updateQuiz = ({ body: body, params: { id } }, res) => {
//     const updatedQuiz = Quizzes.update(body, id);
//     res.json(updatedQuiz)
// }
