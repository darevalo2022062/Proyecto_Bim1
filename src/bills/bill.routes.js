import { Router } from "express";
import { billEdit, viewBills, viewBillsByClient } from "./bill.controller.js";
import { check } from "express-validator";
import { verifExistenceBill } from "../middlewares/bill.middlewares.js";
import { validarAdmin } from "../middlewares/role_validation.js";
import { validar } from "../middlewares/validar-campos.js";
import { existenceIdentifier } from "../middlewares/userAuth.middlewares.js";

const router = Router();

router.get(
    '/view',
    [
        validarAdmin,
        validar
    ], viewBills
);

router.get(
    '/viewBillsCustumer',
    [
        validarAdmin,
        check('nombreComprador').not().isEmpty().withMessage('The field "comprador" is empty ❌'),
        check('nombreComprador').custom(existenceIdentifier),
        validar
    ], viewBillsByClient
);

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