const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { postLogin } = require('../controllers/auth.controllers');
const validateFields = require('../middlewares/validate-fields');

router.post('/login', [
    check('email', 'El correo es invalido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validateFields
], postLogin)

module.exports = router