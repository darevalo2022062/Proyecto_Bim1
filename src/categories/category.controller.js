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
    await Category.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: "Category successfully removed"
    });
}

export const categoryGet = async (req, res) => {
    const categorias = await Category.find({ estado: true });
    if (!categorias) {
        return res.status(400).json({
            msg: "There are no categories"
        });
    }

    const categoriasDes = categorias.map(categorias => {
        return {
            nombre: categorias.nombre,
            detalles: categorias.detalles
        };
    });

    res.status(200).json({
        msg: "|-----Categories-----|",
        categoriasDes
    });

}

export const categoryPut = async (req, res) => {
    var { nombre, nuevoNombre, detalles } = req.body;
    //ENCONTRAR ID
    const categoria = await Category.findOne({ nombre: nombre, estado: true });

    //Sí existen datos vacíos
    !nuevoNombre ? nuevoNombre = nombre : nuevoNombre = nuevoNombre;
    !detalles ? detalles = categoria.detalles : detalles = detalles;

    //ACtualización
    await Category.findByIdAndUpdate(categoria._id, { nombre: nuevoNombre, detalles: detalles });

    res.status(200).json({
        msg: "Datos Actualizados"
    });

}
