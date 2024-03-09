import { Router } from "express";
import { billEdit } from "./bill.controller.js";
import { check } from "express-validator";
import { verifExistenceBill } from "../middlewares/bill.middlewares.js";
import { validarAdmin } from "../middlewares/role_validation.js";
import { validar } from "../middlewares/validar-campos.js";

const router = Router();

router.put(
    '/edit',
    [
        validarAdmin,
        check('id').not().isEmpty().withMessage('The field "id" is empty ❌'),
        check('id').custom(verifExistenceBill),
        check('comprador').not().isEmpty().withMessage('The field "comprador" is empty ❌'),
        check('fechaEmision').not().isEmpty().withMessage('The field "fechaEmision" is empty ❌'),
        check('total').not().isEmpty().withMessage('The field "total" is empty ❌'),
        validar
    ], billEdit
);

export default router;  