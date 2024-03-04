import { Router } from "express";
import { check } from 'express-validator';
import { categoryDelete, categoryGet, categoryPost, categoryPut } from "./category.controller.js";
import { validar } from "../middlewares/validar-campos.js";
import { existenciaCategory } from "../helpers/validar-existencias.js";
import { verifCategory } from "../helpers/verif-exists.js";
import { categoryDeleted } from "../middlewares/updates_product.js";

const router = Router();

//Creación Categoría
router.post(
    '/new',
    [
        check("nombre").not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check("nombre").custom(existenciaCategory),
        check("detalles").not().isEmpty().withMessage('The field "detalles" is empty ❌'),
        validar
    ], categoryPost
);

//ELiminación de Categoría
router.delete(
    '/delete',
    [
        check("nombre").not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check("nombre").custom(verifCategory),
        check('nombre').custom(categoryDeleted),
        validar
    ], categoryDelete
);

//Visualizar categorías
router.get(
    '/view',
    [

    ], categoryGet
);

//Editar Categorías
router.put(
    "/update",
    [
        check("nombre").not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check("nombre").custom(verifCategory),
        check("nuevoNombre").custom(existenciaCategory),
        validar
    ], categoryPut
);

export default router;