const router = require('express').Router()
const authsController = require('../controllers/auths')
const protectedRoute = require('../utils/protectedRoute')

router.get('/', authsController.getAll)
router.get('/:id', authsController.getOneById)
// router.post('/signup', authsController.createUser)
// router.post('/login', authsController.login)
router.post('/exchange', authsController.createToken)
router.put('/:id', authsController.updateUser)
router.delete('/:id', authsController.deleteUser)


router.post('/google', authsController.exchangeCode);
router.post('/signup', authsController.registerUser);
router.post('/login', authsController.loginUser);


module.exports = router