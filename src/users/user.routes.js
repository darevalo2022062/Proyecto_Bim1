import { Router } from "express";
import { registerAdmin, registerCliente } from "./user.controller.js";
import { check } from "express-validator";
import { emailExistence, userNameExistence } from "../middlewares/userAuth.middlewares.js";
import { validar } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/registerClient',
    [
        check("userName").not().isEmpty().withMessage('The field "userName" is empty ❌'),
        check('email').not().isEmpty().withMessage('The field "email" is empty ❌'),
        check('email').isEmail(),
        check('password').isLength({ min: 5 }).withMessage('The password needs at least 5 characters ❌'),
        check('userName').custom(userNameExistence),
        check('email').custom(emailExistence),
        validar
    ], registerCliente
);

router.post(
    '/registerAdmin',
    [
        check("userName").not().isEmpty().withMessage('The field "userName" is empty ❌'),
        check('email').not().isEmpty().withMessage('The field "email" is empty ❌'),
        check('email').isEmail(),
        check('password').isLength({ min: 5 }).withMessage('The password needs at least 5 characters ❌'),
        check('userName').custom(userNameExistence),
        check('email').custom(emailExistence),
        validar
    ], registerAdmin
);



export default router;