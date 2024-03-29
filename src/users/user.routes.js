import { Router } from "express";
import { addUser, deleteMyProfile, deleteUser, editMyProfile, registerAdmin, registerCliente, updateUser } from "./user.controller.js";
import { check } from "express-validator";
import { emailExistence, emailExistenceUpdate, isClient, userNameExistence, userNameVerifExistence } from "../middlewares/userAuth.middlewares.js";
import { validar } from "../middlewares/validar-campos.js";
import { validarAdmin, validarClient } from "../middlewares/role_validation.js";

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

router.post(
    '/addUser',
    [
        validarAdmin,
        check("userName").not().isEmpty().withMessage('The field "userName" is empty ❌'),
        check('email').not().isEmpty().withMessage('The field "email" is empty ❌'),
        check('email').isEmail(),
        check('password').isLength({ min: 5 }).withMessage('The password needs at least 5 characters ❌'),
        check('userName').custom(userNameExistence),
        check('email').custom(emailExistence),
        validar
    ], addUser
);

router.put(
    '/updateUser',
    [
        validarAdmin,
        check("userName").not().isEmpty().withMessage('The field "userName" is empty ❌'),
        check('userName').custom(userNameVerifExistence),
        check('userName').custom(isClient),
        check('email').not().isEmpty().withMessage('The field "email" is empty ❌'),
        check('email').isEmail(),
        check('newUserName').custom(userNameExistence),
        check('email').custom(emailExistenceUpdate),
        validar
    ], updateUser
);

router.delete(
    '/deleteUser',
    [
        check("userName").not().isEmpty().withMessage('The field "userName" is empty ❌'),
        check('userName').custom(userNameVerifExistence),
        check('userName').custom(isClient),
        validar
    ], deleteUser
);

router.put(
    '/editMyUser',
    [
        validarClient,
        check("newUserName").not().isEmpty().withMessage('The field "userName" is empty ❌'),
        check('newUserName').custom(userNameExistence),
        check('email').isEmail(),
        check('email').custom(emailExistence),
        validar
    ], editMyProfile
);

router.delete(
    '/deleteMyUser',
    [
        validarClient,
        check('password').not().isEmpty().withMessage('The field "password" is empty ❌'),
        validar
    ], deleteMyProfile
);


export default router;