import Product from "../products/product.js";
import memoryCache from 'memory-cache';

//Verificar que existan productos en carrito
export const verifExistencesProductsInCart = async (req, res, next) => {
    const productsInCart = memoryCache.get('productsTaken');
    if (!productsInCart) {
        return res.status(200).json({
            msg: 'Your cart is still empty, add products!'
        });
    }
    next();
}