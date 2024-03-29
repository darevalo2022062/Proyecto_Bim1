import Product from '../products/product.js';
import ObjectTaken from './objectTaken.js';
import memoryCache from 'memory-cache';

//AGREGAR PRODUCTOS A CARRITO
export const AddToShoppingCar = async (req, res) => {
    var { nombre, cantidad } = req.body;
    const product = await Product.findOne({ nombre: nombre });
    const idProduct = product._id;

    var newTaken = new ObjectTaken(idProduct.toString(), cantidad);
    var objectsTaken = [];
    var arrayActual = memoryCache.get('productsTaken');
    if (arrayActual) {
        let bandera = false;
        objectsTaken = arrayActual;
        objectsTaken.forEach(element => {
            if (element.idProduct == newTaken.idProduct) {
                element.cantidad = element.cantidad + newTaken.cantidad;
                bandera = true;
            }
        });
        !bandera ? objectsTaken.push(newTaken) : {}
    } else {
        objectsTaken.push(newTaken);
    }

    memoryCache.put('productsTaken', objectsTaken);
    console.log(memoryCache.get('productsTaken'));
    res.status(200).json({
        msg: 'Product added to shopping cart Successfully'
    });
}

//VISUALIZAR CARRITO
export const viewShoppingCart = async (req, res) => {
    const productsInCart = memoryCache.get('productsTaken');
    const productosMostrar = [];

    for (const product of productsInCart) {
        const productData = await Product.findById(product.idProduct);
        productosMostrar.push({
            nombre: productData.nombre,
            precio_Unitario: productData.precio,
            cantidad: product.cantidad
        });
    }

    return res.status(200).json({
        msg: 'This is your shopping cart',
        productosMostrar
    });



}