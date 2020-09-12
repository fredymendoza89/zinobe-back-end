/*
    Ruta: api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('tipoDoc', 'El tipo de documento es obligatorio').not().isEmpty(),
        check('numDoc', 'El número de documento es obligatorio y debe ser numérico').not().isEmpty().isNumeric(),
        check('estadoCredito', 'El estado del credito es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearUsuario
);

module.exports = router;