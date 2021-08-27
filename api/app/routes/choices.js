const router = require('express').Router()
const choicesController = require('../controllers/choices')
const protectedRoute = require('../utils/protectedRoute');

router.get('/', choicesController.getAll)
router.get('/:id', choicesController.getOneById)
router.post('/', choicesController.createChoice)
router.put('/:id', choicesController.updateChoice)
router.delete('/:id', choicesController.deleteChoice)

module.exports = router