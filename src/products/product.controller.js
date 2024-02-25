import Product from './product.js';

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