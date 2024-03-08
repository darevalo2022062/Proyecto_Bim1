import { Schema, model } from "mongoose";

const BillSchema = Schema({
    comprador: {
        type: String,
        required: [true, 'Obligatory']
    },
    fechaEmision: {
        type: String,
        required: [true, 'Obligatory']
    },
    productos: {
        type: Array,
        required: [true, "El campo es obligatorio"]
    },
    total: {
        type: Number,
        required: [true, 'Obligatory']
    }
});

export default model('Bill', BillSchema);