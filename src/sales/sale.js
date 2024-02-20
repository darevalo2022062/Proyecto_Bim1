import { Schema, model } from 'mongoose';

const SaleSchema = Schema({
    fecha: {
        type: String,
        required: [true, "El campo es obligatorio"]
    },
    productos: {
        type: Array,
        required: [true, "El campo es obligatorio"]
    },
    cliente: {
        type: String,
        required: [true, "El campo es obligatorio"]
    },
    factura: {
        type: String,
        required: [true, "El campo es obligatorio"]
    }
});

export default model('Sale', SaleSchema);