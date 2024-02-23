import { Router } from 'express';
import { productPost } from './product.controller.js';
import { check } from 'express-validator';
import { verifCategory } from '../helpers/verif-exists.js';
import { validar } from '../middlewares/validar-campos.js';
import { existenciaProduct } from '../helpers/validar-existencias.js';

const router = Router();

//Crear Producto
router.post(
    '/newProduct',
    [
        check('nombre').not().isEmpty(),
        check('nombre').custom(existenciaProduct),
        check('detalles').not().isEmpty(),
        check('categoria').not().isEmpty(),
        check('categoria').custom(verifCategory),
        check('stock').not().isEmpty(),
        validar
    ], productPost
);




export default router;