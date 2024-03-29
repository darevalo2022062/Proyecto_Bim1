import { Router } from 'express';
import { productBestSell, productBestSellers, productByCategory, productDelete, productEdit, productPost, productViewComplete, productViewFliterCategory, productViewInventory, productViewOne } from './product.controller.js';
import { check } from 'express-validator';
import { verifCategory, verifProduct } from '../helpers/verif-exists.js';
import { validar } from '../middlewares/validar-campos.js';
import { existenciaProduct } from '../helpers/validar-existencias.js';
import { validarAdmin, validarClient } from '../middlewares/role_validation.js';
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
        check('precio').not().isEmpty().withMessage('The field "precio" is empty ❌'),
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

//visualizar todo el catalogo CLiente
router.get(
    '/getCatalogueClient',
    [
        validarClient,
        check('filtrar').not().isEmpty().withMessage('The field "filtrar" is empty ❌'),
        verifExistencesProducts,
        validar
    ], productViewFliterCategory
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

//Visualizar producto Cliente
router.get(
    '/getProduct',
    [
        validarClient,
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(verifProduct),
        validar
    ], productViewOne
);

//Visualizar Inventario de productos
router.get(
    '/getInventory',
    [
        validarAdmin,
        verifExistencesProducts,
        validar
    ], productViewInventory
);

//Editar un producto
router.put(
    '/update',
    [
        validarAdmin,
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(verifProduct),
        check('categoria').custom(existenceCategoryUpdate),
        check('nuevoNombre').custom(existenceProductUpdate),
        validar
    ], productEdit
);

//Eliminar un producto
router.delete(
    '/delete',
    [
        validarAdmin,
        check('nombre').not().isEmpty().withMessage('The field "nombre" is empty ❌'),
        check('nombre').custom(verifProduct),
        validar
    ], productDelete
);

//Ver producto mas vendidos
router.get(
    '/productsBestSellers',
    [
        validarAdmin,
        validar
    ], productBestSellers
);

router.get(
    '/productsBestSell',
    [
        validarClient,
        validar
    ], productBestSell
);

//Ver por categoria
router.get(
    '/productsByCategory',
    [
        validarClient,
        check('categoria').not().isEmpty().withMessage('The field "categoria" is empty ❌'),
        check('categoria').custom(verifCategory),
        validar
    ], productByCategory
);

export default router;