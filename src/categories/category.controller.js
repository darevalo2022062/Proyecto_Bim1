import Category from './category.js';

export const categoryPost = async (req, res) => {

    const { nombre, detalles } = req.body;
    const categoria = new Category({ nombre, detalles });
    await categoria.save();

    res.status(200).json({
        msg: "Se agrego correctamente la categoría",
        categoria
    });

}
