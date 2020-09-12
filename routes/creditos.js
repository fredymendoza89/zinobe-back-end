/*
    Creditos
    ruta: '/api/creditos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getCreditos, crearCredito } = require('../controllers/creditos');

const router = Router();

router.get('/', getCreditos);

router.post('/', [
        validarJWT,
        check('valorSolicitado', 'El valor solicitado es necesario y debe ser numérico').not().isEmpty().isNumeric(),
        check('pagoCredito', 'El pago del credito es necesario').not().isEmpty(),
        validarCampos
    ],
    crearCredito
);

module.exports = router;