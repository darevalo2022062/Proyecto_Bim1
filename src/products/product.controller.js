import Product from './product.js';

export const productPost = async (req, res) => {
    const { nombre, detalles, categoria, stock } = req.body;
    const product = new Product({ nombre, detalles, categoria, stock });
    await product.save();

    res.status(200).json({
        msg: "Product Created Successfully",
        product
    });

}