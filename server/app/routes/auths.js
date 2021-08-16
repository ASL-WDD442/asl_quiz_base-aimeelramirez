const router = require('express').Router();
const AuthController = require('./../controllers/auths');
// const ValidationController = require('../controllers/validations');
router.get('/', AuthController.renderLanding);
router.get('/list', AuthController.renderAuths);

module.exports = router;