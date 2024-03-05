import Product from "../products/product.js";

export const verifExistencesProducts = async (req, res, next) => {
    const allProducts = await Product.find({ estado: true });
    if (!allProducts) {
        throw new Error("There are currently no products :c");
    }
    next();
}

