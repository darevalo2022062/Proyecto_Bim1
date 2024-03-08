import { Router } from "express";
import { confirmPurchase, shoppingHistory } from "./sale.controller.js";
import { validarClient } from "../middlewares/role_validation.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validar-campos.js";
import { verifExistenceShopping, verifExistencesProductsInCart } from "../middlewares/buy.middlewares.js";

const router = Router();

//COMPRA
router.post(
    '/buy',
    [
        validarClient,
        verifExistencesProductsInCart,
        check('numTarjeta').not().isEmpty().withMessage('The field "numero de Tarjeta" is empty ❌'),
        check('fechaVencimiento').not().isEmpty().withMessage('The field "fecha de vencimiento" is empty ❌'),
        check('nombreTitular').not().isEmpty().withMessage('The field "nombre del titular" is empty ❌'),
        check('cvv').not().isEmpty().withMessage('The field "cvv" is empty ❌'),
        validar
    ], confirmPurchase
);

router.get(
    '/shoppingHistory',
    [
        validarClient,
        verifExistenceShopping,
        validar
    ], shoppingHistory
);

export default router;