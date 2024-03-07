import Product from "../products/product.js";
import Category from "../categories/category.js";
import memoryCache from 'memory-cache';

//Verificar que existan productos en la DB
export const verifExistencesProducts = async (req, res, next) => {
    const allProducts = await Product.find({ estado: true });
    if (!allProducts) {
        throw new Error("There are currently no products :c");
    }
    next();
}

//Verificar si entra algun dato, su existencia CATEGORY
export const existenceCategoryUpdate = async (categoria = '') => {
    if (categoria.length !== 0) {
        const exists = await Category.findOne({ nombre: categoria, estado: true });
        if (!exists) {
            throw new Error("This category does not exist");
        }
    }
}

//Verificar si entra algun dato, su existencia NOMBRE
export const existenceProductUpdate = async (nuevoNombre = '') => {
    if (nuevoNombre.length !== 0) {
        const exists = await Product.findOne({ nombre: nuevoNombre, estado: true });
        if (exists) {
            throw new Error("This Product name already exists");
        }
    }
}

//Verificar STOCK para Agregar a Carrito
export const verifStockToCart = async (req, res, next) => {
    const { nombre, cantidad } = req.body;

    var productsInCart = memoryCache.get('productsTaken');

    if (!productsInCart) {
        const product = await Product.findOne({
            $and: [
                { nombre: nombre },
                { stock: { $gte: cantidad } }
            ]
        });

        if (!product) {
            return res.status(400).json({
                msg: 'We do not have enough stock of this product for your request, sorry :('
            });
        }

    } else {

        let product = await Product.findOne({ nombre: nombre });
        let idProduct = product._id.toString();
        var cantidadReal = 0;
        productsInCart.forEach(element => {
            if (element.idProduct == idProduct) {
                cantidadReal = element.cantidad + cantidad;
            }
        });

        const productInDB = await Product.findOne({
            $and: [
                { nombre: nombre },
                { stock: { $gte: cantidadReal } }
            ]
        });

        if (!productInDB) {
            return res.status(400).json({
                msg: 'We do not have enough stock of this product for your request, sorry :('
            });
        }
    }



    next();

}
