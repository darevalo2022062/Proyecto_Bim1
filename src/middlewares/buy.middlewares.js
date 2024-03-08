import Product from "../products/product.js";
import memoryCache from 'memory-cache';
import Sale from "../sales/sale.js";
import jwt from 'jsonwebtoken';

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

//Verificar que el cliente tenga compras
export const verifExistenceShopping = async (req, res, next) => {
    let token = global.token;
    const idUSer = jwt.verify(token, process.env.PASSWEBTOKEN).userId;
    const compras = Sale.find({ cliente: idUSer });
    if (!compras) {
        return res.status(200).json({
            msg: 'You have not made any purchases'
        });
    }
    next();
}