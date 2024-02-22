import Category from "../categories/category.js";

export const verifCategory = async (nombre = '') => {
    const exists = await Category.findOne({ nombre: nombre });
    if (!exists) {
        throw new Error("Esa categoría NO existe");
    }
}