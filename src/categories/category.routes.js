import { Router } from "express";
import { check } from 'express-validator';
import { categoryPost } from "./category.controller.js";
import { validar } from "../middlewares/validar-campos.js";
import { existenciaCategory } from "../helpers/validar-existencias.js";
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

export default router;