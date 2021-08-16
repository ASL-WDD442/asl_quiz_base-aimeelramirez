const router = require('express').Router();
const QuestionController = require('../controllers/questions');
router.get('/list', QuestionController.renderQuestions);
router.get('/:id', QuestionController.renderQuestionDetails);


module.exports = router;