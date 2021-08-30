const router = require('express').Router()
const authsController = require('../controllers/auths')
const protectedRoute = require('../utils/protectedRoute')

router.get('/', protectedRoute, authsController.getAll)
router.get('/:id', protectedRoute, authsController.getOneById)
// router.post('/signup', authsController.createUser)
// router.post('/login', authsController.login)
router.post('/exchange', protectedRoute, authsController.createToken)
router.put('/:id', protectedRoute, authsController.updateUser)
router.delete('/:id', protectedRoute, authsController.deleteUser)


router.post('/google', authsController.exchangeCode);
router.post('/signup', authsController.registerUser);
router.post('/login', authsController.loginUser);


module.exports = router