const { response } = require('express');
const Credito = require('../models/credito');
const Usuario = require('../models/usuario');

const getCreditos = async(req, res = response) => {

    try {

        const creditos = await Credito.find().populate('usuario', 'valorSolicitado fechaPago estadoCredito pagoCredito');
        res.json({
            ok: true,
            creditos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

}

const crearCredito = async(req, res = response) => {

    const uid = req.uid;
    const credito = new Credito({
        usuario: uid,
        ...req.body
    });

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por id'
            });
        }

        if (usuarioDB.estadoCredito.toUpperCase() === 'RECHAZADO') {
            return res.status(404).json({
                ok: false,
                msg: `No se puede crear el credito ya que se le rechazo al usuario ${ usuarioDB.nombre }`
            });
        }

        const creditoDB = await credito.save();

        res.json({
            ok: true,
            credito: creditoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getCreditos,
    crearCredito
}