const router = require('express').Router();
const QuizController = require('../controllers/quizzes');
const ValidationController = require('../controllers/validations');


router.get('/list', QuizController.renderMyQuizzes);
router.get('/:id', QuizController.renderQuiz);


router.get('/new', QuizController.renderQuizForm);
// router.post('/new', [
//     ValidationController.validate('createQuiz'),
//     QuizController.renderQuizFormWithErrors,
//     QuizController.saveQuiz,
// ]);

module.exports = router;