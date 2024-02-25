import Category from './category.js';

export const categoryPost = async (req, res) => {
    var categoria = null;
    const { nombre, detalles } = req.body;
    const existsF = await Category.findOne({ nombre: nombre, estado: false });

    if (existsF) {
        await Category.findByIdAndUpdate(existsF._id, { $set: { detalles: detalles, estado: true } });
        categoria = await Category.findOne({ nombre: nombre });
    }

    if (!existsF) {
        categoria = new Category({ nombre, detalles });
        await categoria.save();
    }

    res.status(200).json({
        msg: "Category Created Successfully",
        categoria
    });

}