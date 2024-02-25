import Category from "../categories/category.js";

export const existenciaCategory = async (nombre = '', { req }) => {
    const exists = await Category.findOne({ nombre: nombre, estado: true });
    if (exists) {
        throw new Error("Esa categoría ya existe en la base de datos");
    }
}
