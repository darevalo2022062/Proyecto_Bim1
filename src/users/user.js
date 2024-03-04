import { Schema, model } from "mongoose";

const UserSchema = Schema({
    userName: {
        type: String,
        required: [true, 'The "userName" data is mandatory']
    },
    email: {
        type: String,
        required: [true, 'The "email" data is mandatory']
    },
    password: {
        type: String,
        required: [true, 'The "password" data is mandatory']
    },
    role: {
        type: String,
        required: [true, 'The "pssword" data is mandatory']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default model("User", UserSchema);