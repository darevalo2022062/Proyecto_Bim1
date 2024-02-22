import Category from '../categories/category.js';

export const verifExistsParam = async (req, res, next) => {
    try {
        const nombreCategory = req.params.nombreCat;
        const categoriaEncontrada = await Category.findOne({ nombre: nombreCategory, estado: true });
        if (!categoriaEncontrada) {
            return res.status(404).json({ error: 'That category does not exist' });
        }
    } catch (e) {
        console.log("¡ERROR!");
        console.log(e);
    }
    next();
}