import Category from "../categories/category.js";
import Product from "../products/product.js";

export const verifCategory = async (nombre = '') => {
    const exists = await Category.findOne({ nombre: nombre, estado: true });
    if (!exists) {
        throw new Error("This category does not exist");
    }
}

export const verifProduct = async (nombre = '') => {
    const exists = await Product.findOne({ nombre: nombre, estado: true });
    if (!exists) {
        throw new Error("This product does not exist");
    }
}

