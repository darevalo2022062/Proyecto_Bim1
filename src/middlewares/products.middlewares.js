import Product from "../products/product.js";
import Category from "../categories/category.js";

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
