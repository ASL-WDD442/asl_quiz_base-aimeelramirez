const router = require("express").Router();
const QuestionController = require("./../controllers/questions");
const ValidationController = require('./../controllers/validations');

router.get("/list", QuestionController.renderQuestionsAll);

router.get('/new', QuestionController.renderQuestionForm);
router.post('/new', [
    ValidationController.validate('createQuestion'),
    QuestionController.renderQuestionFormWithErrors,
    QuestionController.saveQuestion,
]);

router.get('/:id', QuestionController.renderQuestionDetails);

router.get('/edit/:id', QuestionController.renderEditForm);
router.post('/edit/:id', [
    ValidationController.validate('editQuestion'),
    QuestionController.renderQuestionFormWithErrors,
    QuestionController.saveQuestion,
]);

router.get('/delete/:id', [
    ValidationController.validate('deleteQuestion'),
    QuestionController.goBackOnError,
    QuestionController.deleteQuestion,
]);
module.exports = router;
