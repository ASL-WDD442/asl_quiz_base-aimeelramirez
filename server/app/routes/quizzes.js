const router = require('express').Router();
const QuizController = require('../controllers/quizzes');
const ValidationController = require('../controllers/validations');


router.get('/list', QuizController.renderMyQuizzes);
router.get('/:id', QuizController.renderQuizDetail);
router.get('/new', QuizController.renderQuizForm);


module.exports = router;