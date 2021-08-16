const router = require('express').Router();
const quizController = require('./../controllers/quizzes');
const questionsController = require('./../controllers/questions');

router.get('/', quizController.renderLanding);
router.get('/quiz', quizController.renderLanding);
// router.get('/question', questionsController.renderQuestions);



module.exports = router;