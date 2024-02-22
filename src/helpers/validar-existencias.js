import Category from "../categories/category.js";

export const existenciaCategory = async (nombre = '') => {
    const exists = await Category.findOne({ nombre: nombre, estado: true });
    if (exists) {
        throw new Error("This category already exists");
    }
}
