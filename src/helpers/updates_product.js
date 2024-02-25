import Product from "../products/product.js";

export const categoryDeleted = async (nombre = '') => {
    const defaultCategory = "Producto Vario";
    await Product.updateMany({ categoria: nombre, estado: true }, { $set: { categoria: defaultCategory } });

}