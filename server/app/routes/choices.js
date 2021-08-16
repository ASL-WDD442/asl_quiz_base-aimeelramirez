const router = require("express").Router();
const ChoiceController = require("../controllers/choices");
const ValidationController = require("../controllers/validations");

router.get("/list", ChoiceController.renderChoices);

router.get('/new', ChoiceController.renderChoiceForm);
router.post('/new', [
    ValidationController.validate('createChoice'),
    ChoiceController.renderChoiceFormWithErrors,
    ChoiceController.saveChoice,
]);

router.get("/:id", ChoiceController.renderChoiceDetails);

router.get('/edit/:id', ChoiceController.renderEditForm);

router.post('/edit/:id', [
    ValidationController.validate('editChoice'),
    ChoiceController.renderChoiceFormWithErrors,
    ChoiceController.saveChoice,
]);

router.get('/delete/:id', [
    ValidationController.validate('deleteChoice'),
    ChoiceController.goBackOnError,
    ChoiceController.deleteChoice,
]);

module.exports = router;
