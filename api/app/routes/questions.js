const router = require('express').Router()
const questionsController = require('../controllers/questions')
const protectedRoute = require('../utils/protectedRoute');

router.get('/', protectedRoute, questionsController.getAll)
router.get('/:id', protectedRoute, questionsController.getOneById)
router.post('/', protectedRoute, questionsController.createQuestion)
router.put('/:id', protectedRoute, questionsController.updateQuestion)
router.delete('/:id', protectedRoute, questionsController.deleteQuestion)

module.exports = router