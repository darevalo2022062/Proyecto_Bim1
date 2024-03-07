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

//Editar detalles específicos de un producto
export const productEdit = async (req, res) => {
    var { nombre, nuevoNombre, detalles, categoria, stock } = req.body;

    const camposActualizables = {};
    if (nuevoNombre) camposActualizables.nuevoNombre = nuevoNombre;
    if (detalles) camposActualizables.detalles = detalles;
    if (categoria) camposActualizables.categoria = categoria;
    if (stock) camposActualizables.stock = stock;

    if (Object.keys(camposActualizables).length === 0) {
        return res.status(400).json({ msg: 'You must enter some information' });
    }

    await Product.findOneAndUpdate({ nombre: nombre },
        {
            nombre: camposActualizables.nuevoNombre,
            detalles: camposActualizables.detalles,
            categoria: camposActualizables.categoria,
            stock: camposActualizables.stock
        });

    res.status(200).json({
        msg: "Product Updated Successfully"
    });

}

//Visualizar inventario de productos
export const productViewInventory = async (req, res) => {
    const allProducts = await Product.find({ estado: true });
    const catalogue = allProducts.map(product => {
        if (product.stock == 0) {
            return {
                nombre: product.nombre,
                categoria: product.categoria,
                stock: 'AGOTADO'
            }
        } else {
            return {
                nombre: product.nombre,
                categoria: product.categoria,
                stock: product.stock
            }
        }
    });
    res.status(200).json({
        msg: "|------------PRODUCT CATALOG------------|",
        catalogue
    });
}

//Eliminar un producto
export const productDelete = async (req, res) => {
    var { nombre } = req.body;
    await Product.findOneAndUpdate({ nombre: nombre }, { $set: { estado: false } });
    res.status(200).json({
        msg: "Deleted Successfully!"
    });
}
