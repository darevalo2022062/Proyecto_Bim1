import { Router } from 'express';
import { productEdit, productPost, productViewComplete, productViewOne } from './product.controller.js';
import { check } from 'express-validator';
import { verifCategory, verifProduct } from '../helpers/verif-exists.js';
import { validar } from '../middlewares/validar-campos.js';
import { existenciaProduct } from '../helpers/validar-existencias.js';
import { validarAdmin } from '../middlewares/role_validation.js';
import { existenceCategoryUpdate, existenceProductUpdate, verifExistencesProducts } from '../middlewares/products.middlewares.js';

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

//Visualizar un solo producto
router.get(
    '/getOne',
    [
        validarAdmin,
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(verifProduct),
        validar
    ], productViewOne
);

//Editar un producto
router.put(
    '/update',
    [
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(verifProduct),
        check('categoria').custom(existenceCategoryUpdate),
        check('nuevoNombre').custom(existenceProductUpdate),
        validar
    ], productEdit
);



export default router;