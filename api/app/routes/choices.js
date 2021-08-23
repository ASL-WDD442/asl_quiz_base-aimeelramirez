const router = require('express').Router()
const choicesController = require('../controllers/choices')
const protectedRoute = require('../utils/protectedRoute');

router.get('/', choicesController.getAll)
router.get('/:id', choicesController.getOneById)
router.post('/', choicesController.createChoice)
router.put('/:id', protectedRoute, choicesController.updateChoice)
router.delete('/:id', protectedRoute, choicesController.deleteChoice)

module.exports = router