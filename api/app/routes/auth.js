const router = require('express').Router()
const authsController = require('../controllers/auths')

router.get('/', authsController.getAll)
router.get('/:id', authsController.getOneById)
router.post('/', authsController.createUser)
router.put('/:id', authsController.updateUser)
router.delete('/:id', authsController.deleteUser)

module.exports = router