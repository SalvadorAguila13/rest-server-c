// * ******************Rutas y protección de rutas********************** //
const { Router } = require("express");
const router = Router();
const { getUser, postUser, putUser, patchUser, deleteUser } = require("../controllers/users.controller");

const validateFields = require("../middlewares/validate-fields");
const { isValidRole, isValidEmail, userExistsById } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { isAdminRole, authorizedRoles } = require("../middlewares/validate-roles");



// todo: Routes
router.get("/", getUser);

router.put("/:id",[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields
], putUser);

router.post("/", 
[
    check('name', 'El nombre es requerido').not().isEmpty(),
    // check('email', 'El correo no es valido').isEmail(),
    check('email').custom(isValidEmail),
    check('password', 'El password es requerido y debe contener mas de 5 caracteres').not().isEmpty().isLength({min: 5}),
    // check('role', 'Colocar un rol permitido ').isIn(['Admin', 'User']),
    check('role').custom(isValidRole),
    validateFields
],
postUser);

router.patch("/", patchUser);

router.delete("/:id", [
    validateJWT,
    // isAdminRole,
    authorizedRoles('ADMIN_ROLE', 'SALE_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], deleteUser);

module.exports = router;
