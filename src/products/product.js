import { Schema, model } from 'mongoose';

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'The "nombre" data is mandatory']
    },
    detalles: {
        type: String,
        required: [true, 'The "detalles" data is mandatory']
    },
    categoria: {
        type: String,
        required: [true, 'The "categoría" data is mandatory']
    },
    stock: {
        type: Number,
        required: [true, 'The "stock" data is mandatory']
    },
    sales: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, 'The "precio" data is mandatory']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default model('Product', ProductSchema);