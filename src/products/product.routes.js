import { Router } from 'express';
import { productPost, productViewComplete } from './product.controller.js';
import { check } from 'express-validator';
import { verifCategory } from '../helpers/verif-exists.js';
import { validar } from '../middlewares/validar-campos.js';
import { existenciaProduct } from '../helpers/validar-existencias.js';
import { validarAdmin } from '../middlewares/role_validation.js';
import { verifExistencesProducts } from '../middlewares/products.middlewares.js';

const router = Router();

//Crear Producto
router.post(
    '/new',
    [
        validarAdmin,
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(existenciaProduct),
        check('detalles').not().isEmpty().withMessage('The field "detalles" is empty ❌'),
        check('categoria').not().isEmpty().withMessage('The field "categoria" is empty ❌'),
        check('categoria').custom(verifCategory),
        check('stock').not().isEmpty().withMessage('The field "stock" is empty ❌'),
        validar
    ], productPost
);


//Visualizar todo el catálogo
router.get(
    '/getCatalogue',
    [
        validarAdmin,
        verifExistencesProducts,
        validar
    ], productViewComplete
);



export default router;