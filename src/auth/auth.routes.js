import { Router } from "express";
import { login } from "./auth.controller.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validar-campos.js";
import { existenceIdentifier } from "../middlewares/userAuth.middlewares.js";

const router = Router();

router.post(
    '/login',
    [
        check('identifier').not().isEmpty().withMessage('The field "identifier" is empty ❌'),
        check('password').not().isEmpty().withMessage('The field "pasword" is empty ❌'),
        check('identifier').custom(existenceIdentifier),
        validar
    ], login
);


export default router;