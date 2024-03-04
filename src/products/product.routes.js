import { Router } from 'express';
import { productPost } from './product.controller.js';
import { check } from 'express-validator';
import { verifCategory } from '../helpers/verif-exists.js';
import { validar } from '../middlewares/validar-campos.js';
import { existenciaProduct } from '../helpers/validar-existencias.js';

const router = Router();

//Crear Producto
router.post(
    '/new',
    [
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(existenciaProduct),
        check('detalles').not().isEmpty().withMessage('The field "detalles" is empty ❌'),
        check('categoria').not().isEmpty().withMessage('The field "categoria" is empty ❌'),
        check('categoria').custom(verifCategory),
        check('stock').not().isEmpty().withMessage('The field "stock" is empty ❌'),
        validar
    ], productPost
);




export default router;