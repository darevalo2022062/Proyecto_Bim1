import { Router } from "express";
import { check } from "express-validator";
import { validar } from "../middlewares/validar-campos.js";
import { verifStockToCart } from "../middlewares/products.middlewares.js";
import { AddToShoppingCar } from "./obectTaken.controller.js";
import { verifProduct } from "../helpers/verif-exists.js";
import { validarClient } from "../middlewares/role_validation.js";

const router = Router();

router.post(
    '/add',
    [
        validarClient,
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('cantidad').not().isEmpty().withMessage('The field "cantidad" is empty ❌'),
        check('nombre').custom(verifProduct),
        validar,
        verifStockToCart
    ], AddToShoppingCar
);




export default router;