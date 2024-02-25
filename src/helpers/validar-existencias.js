import Category from "../categories/category.js";
import Product from "../products/product.js";


export const existenciaCategory = async (nombre = '') => {
    const exists = await Category.findOne({ nombre: nombre, estado: true });
    if (exists) {
        throw new Error("This category already exists");
    }
}

export const existenciaProduct = async (nombre = '') => {
    const exists = await Product.findOne({ nombre: nombre, estado: true });
    if (exists) {
        throw new Error("This Product already exists");
    }
} 



//EXISTENCIAS COMO PARAMETROS

