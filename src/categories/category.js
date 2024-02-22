import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la catogoría es obligatorio"]
    },
    detalles: {
        type: String,
        required: [true, "los detalles de la categoría son obligatorios"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default model('Category', CategorySchema);