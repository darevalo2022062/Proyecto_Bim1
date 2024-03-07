import { validationResult } from 'express-validator';

export const validar = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajesDeError = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: mensajesDeError });
    }
    next();
}


