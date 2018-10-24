const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cotizacionSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  fases: [{
    fase: {
      type: String
    },
    fecha: {
      type: Date
    }
  }],
  productos: [{
    precio: {
      type: Number
    },
    producto: {
      type: Schema.Types.ObjectId,
      ref: 'Producto'
    }
  }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Cotizacion', cotizacionSchema);