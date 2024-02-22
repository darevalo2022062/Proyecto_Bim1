import Category from './category.js';

export const categoryPost = async (req, res) => {

    const { nombre, detalles } = req.body;
    const categoria = new Category({ nombre, detalles });
    await categoria.save();

    res.status(200).json({
        msg: "Category Created Successfully",
        categoria
    });

}

export const categoryDelete = async (req, res) => {
    const { nombre } = req.body;
    const query = { nombre: nombre, estado: true };
    const categoria = await Category.findOne(query);
    var id = categoria._id;
    await Category.findByIdAndUpdate({ id }, { estado: false });

    res.status(200).json({
        msg: "Category successfully removed"
    });
}
