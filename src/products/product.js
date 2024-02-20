import { Schema, model } from 'mongoose';

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    detalles: {
        type: String,
        required: [true, "Los detalles es algo obligatoria"]
    },
    categoria: {
        type: String,
        required: [true, "La categoría del producto es obligatoria"]
    },
    stock: {
        type: Number,
        required: [true, "La cantidad de stock inicial es obligatoria"]
    }
});

export default model('Product', ProductSchema);