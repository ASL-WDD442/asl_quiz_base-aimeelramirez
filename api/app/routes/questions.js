const router = require('express').Router()
const questionsController = require('../controllers/questions')
const protectedRoute = require('../utils/protectedRoute');

router.get('/', questionsController.getAll)
router.get('/:id', questionsController.getOneById)
router.post('/', questionsController.createQuestion)
router.put('/:id', protectedRoute, questionsController.updateQuestion)
router.delete('/:id', protectedRoute, questionsController.deleteQuestion)

module.exports = router