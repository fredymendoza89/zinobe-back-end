const { Schema, model } = require('mongoose');

const CreditoSchema = Schema({

    valorSolicitado: {
        type: Number
    },
    fechaPago: {
        type: String
    },
    pagoCredito: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

CreditoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Credito', CreditoSchema);