const router = require("express").Router();
const quizController = require("./../controllers/quizzes");
const authController = require("./../controllers/auths");

router.get("/", quizController.renderLanding);
router.get("/quiz", quizController.renderLanding);
router.get("/quiz/list", quizController.renderMyQuizzes);
router.get("/auth/list", authController.renderAuths);

module.exports = router;
