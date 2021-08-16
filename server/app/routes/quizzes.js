const router = require("express").Router();
const QuizController = require("../controllers/quizzes");
const ValidationController = require("../controllers/validations");

router.get("/list", QuizController.renderMyQuizzes);
router.get('/new', QuizController.renderQuizForm);
router.post('/new', [
    ValidationController.validate('createQuiz'),
    QuizController.renderQuizFormWithErrors,
    QuizController.saveQuiz,
]);

router.get("/:id", QuizController.renderQuizDetail);

router.get('/edit/:id', QuizController.renderEditForm);

router.post('/edit/:id', [
    ValidationController.validate('editQuiz'),
    QuizController.renderQuizFormWithErrors,
    QuizController.saveQuiz,
]);

router.get('/delete/:id', [
    ValidationController.validate('deleteQuiz'),
    QuizController.goBackOnError,
    QuizController.deleteQuiz,
]);


module.exports = router;
