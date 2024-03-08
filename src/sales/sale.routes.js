import { Router } from "express";
import { confirmPurchase } from "./sale.controller.js";
import { validarClient } from "../middlewares/role_validation.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validar-campos.js";

const router = Router();

//COMPRA
router.post(
    '/purchase',
    [
        validarClient,
        check('numTarjeta').not().isEmpty().withMessage('The field "numTarjeta" is empty ❌'),
        check('fechaVencimiento').not().isEmpty().withMessage('The field "numTarjeta" is empty ❌'),
        check('nombreTitular').not().isEmpty().withMessage('The field "numTarjeta" is empty ❌'),
        check('cvv').not().isEmpty().withMessage('The field "numTarjeta" is empty ❌'),
        validar
    ], confirmPurchase
);

export default router;