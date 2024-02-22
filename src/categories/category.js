import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'The "nombre" data is mandatory']
    },
    detalles: {
        type: String,
        required: [true, 'The "detalles" data is mandatory']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default model('Category', CategorySchema);