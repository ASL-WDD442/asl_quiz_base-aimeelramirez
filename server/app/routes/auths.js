const router = require("express").Router();
const AuthController = require("./../controllers/auths");
const ValidationController = require('./../controllers/validations');
// router.get("/", AuthController.renderLanding);
router.get("/list", AuthController.renderAuths);
router.get("/:id", AuthController.renderAuth);
router.get('/edit/:id', AuthController.renderEditForm);

router.post('/edit/:id', [
    // ValidationController.validate('editAuth'),
    AuthController.renderAuthFormWithErrors,
    AuthController.saveAuth,
]);


module.exports = router;
