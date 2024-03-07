import Product from '../products/product.js';
import ObjectTaken from './objectTaken.js';
import memoryCache from 'memory-cache';

//AGREGAR PRODUCTOS A CARRITO
export const AddToShoppingCar = async (req, res) => {
    var { nombre, cantidad } = req.body;
    const product = await Product.findOne({ nombre: nombre });
    const idProduct = product._id;

    var newTaken = new ObjectTaken(idProduct.toString(), cantidad);
    //GUARDANDO EN CACHE...
    var objectsTaken = [];
    var arrayActual = memoryCache.get('productsTaken');
    if (arrayActual) {
        objectsTaken = arrayActual;
        objectsTaken.forEach(element => {
            if (element.idProduct == newTaken.idProduct) {
                element.cantidad = element.cantidad + newTaken.cantidad;
            }
        });

    } else {
        objectsTaken.push(newTaken);
    }
    memoryCache.put('productsTaken', objectsTaken);
    console.log(memoryCache.get('productsTaken'));
    res.status(200).json({
        msg: 'Product added to shopping cart Successfully'
    });

}