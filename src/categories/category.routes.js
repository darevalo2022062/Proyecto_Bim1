import { Router } from "express";
import { check } from 'express-validator';
import { categoryDelete, categoryGet, categoryPost, categoryPut } from "./category.controller.js";
import { validar } from "../middlewares/validar-campos.js";
import { existenciaCategory } from "../helpers/validar-existencias.js";
import { verifCategory } from "../helpers/verif-exists.js";
import { verifExistsParam } from "../middlewares/category-middleware.js";
const router = Router();

//Creación Categoría
router.post(
    '/newCategory',
    [
        check("nombre").not().isEmpty(),
        check("nombre").custom(existenciaCategory),
        check("detalles").not().isEmpty(),
        validar
    ], categoryPost
);

//ELiminación de Categoría
router.delete(
    '/deleteCategory',
    [
        check("nombre").not().isEmpty(),
        check("nombre").custom(verifCategory),
        validar
    ], categoryDelete
);

//Visualizar categorías
router.get(
    '/viewCategory',
    [

    ], categoryGet
);

//Editar Categorías
router.put(
    "/updateCategory/:nombreCat",
    [
        check("nombre").not().isEmpty(),
        check("nombre").custom(existenciaCategory),
        check("detalles").not().isEmpty(),
        verifExistsParam,
        validar
    ], categoryPut
);

export default router;