const router = require('express').Router();
const ChoiceController = require('../controllers/choices');
// const ValidationController = require('../controllers/validations');
router.get('/list', ChoiceController.renderChoices);
router.get('/new', ChoiceController.renderChoiceForm);

module.exports = router;