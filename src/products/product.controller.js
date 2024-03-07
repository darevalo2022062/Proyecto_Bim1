import Product from './product.js';

//Crear producto
export const productPost = async (req, res) => {
    const { nombre, detalles, categoria, stock } = req.body;
    var product = null;
    const existsF = await Product.findOne({ nombre: nombre, estado: false });

    if (existsF) {
        await Product.findByIdAndUpdate(existsF._id,
            { $set: { detalles: detalles, categoria: categoria, stock: stock, estado: true } });
        product = await Product.findById(existsF._id);
    } else {
        product = new Product({ nombre, detalles, categoria, stock });
        await product.save();
    }
    res.status(200).json({
        msg: "Product Created Successfully",
        product
    });

}

//Visualizar catalogo (Todos los productos)
export const productViewComplete = async (req, res) => {
    const allProducts = await Product.find({ estado: true });
    const catalogue = allProducts.map(product => {
        return {
            nombre: product.nombre,
            detalles: product.detalles,
            categoria: product.categoria,
            stock: product.stock
        }
    });
    res.status(200).json({
        msg: "|------------PRODUCT CATALOG------------|",
        catalogue
    });
}

//Visiualizar productos individuales
export const productViewOne = async (req, res) => {
    const { nombre } = req.body;
    const product = await Product.findOne({ nombre: nombre });
    const productClean = {
        nombre: product.nombre,
        detalles: product.detalles,
        categoria: product.categoria,
        stock: product.stock
    }

    res.status(200).json({
        msg: "|------------PRODUCT CATALOG------------|",
        productClean
    });
}