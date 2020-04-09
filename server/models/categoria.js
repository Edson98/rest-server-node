const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'El descripción es necesario']
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'usuario' 
    }
});

module.exports = mongoose.model('categoria', categoriaSchema);