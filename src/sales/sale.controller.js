import Bill from "../bills/bill.js";
import Product from "../products/product.js";
import Sale from "./sale.js";
import memoryCache from 'memory-cache';
import jwt from 'jsonwebtoken';
import User from "../users/user.js";

export const confirmPurchase = async (req, res) => {

    function productoEnfactura(id, nombre, cantidad, precio, total) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;
    }

    const { NIT, numTarjeta, fechaVencimiento, nombreTitular, cvv } = req.body;
    if (!NIT) {
        NIT = 'CF';
    }
    //OBTENGO DATOS
    const productsSelected = memoryCache.get('productsTaken');
    //1...Quitar de Stock
    for (var producto of productsSelected) {
        let id = producto.idProduct;
        const product = await Product.findById(id);
        let nuevoStock = product.stock - producto.cantidad;
        let ventas = product.sales + producto.cantidad;
        await Product.findByIdAndUpdate(id, { $set: { stock: nuevoStock, sales: ventas } });
    }
    //2...Crear Factura
    var comprador, fechaEmision, total;
    var productos = [];
    const idUser = jwt.verify(token, process.env.PASSWEBTOKEN).userId;
    comprador = idUser.toString();
    fechaEmision = new Date().toLocaleString();

    var totalExterno = 0;

    for (var producto of productsSelected) {
        let id = producto.idProduct;
        let cantidad = producto.cantidad;
        const product = await Product.findById(id);
        let precio = product.precio;
        let nombre = product.nombre;
        let precioProducto = product.precio;
        let total = precioProducto * cantidad;
        totalExterno = totalExterno + total;
        let productSave = new productoEnfactura(id, nombre, cantidad, precio, total);
        productos.push(productSave);
    }

    total = totalExterno;
    const facturaBill = new Bill({ comprador, fechaEmision, productos, total });
    await facturaBill.save();

    //3... Crear Sale
    var fecha = fechaEmision;
    var cliente = comprador;
    var idFactura = await Bill.findOne({ comprador, fechaEmision, productos, total });
    var factura = idFactura._id;
    const venta = new Sale({ fecha, productos, cliente, factura });
    await venta.save();

    //Presentar Factura
    var clienteFac = await User.findById(idUser);
    const productosComprados = [];
    productos.forEach(producto => {
        const { nombre, cantidad, precio, total } = producto;
        productosComprados.push({ nombre, cantidad, precio, total });
    });

    const facturaMuestra = {
        SHOPKINAL: 'TU TIENDA DE CONFIANZA',
        CLIENTE: clienteFac.userName,
        FECHA_DE_FACTURACION: fechaEmision,
        NUMERO_NIT: NIT,
        NUMERO_DE_TARJETA: numTarjeta,
        TITULAR: nombreTitular,
        PRODUCTOS_COMPRADOS: productosComprados.map(producto => ({
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            precio_unitario: producto.precio,
            total: producto.total
        })),
        TOTAL: total
    };

    memoryCache.put('productsTaken', null);
    res.status(200).json({
        msg: 'Purchase made successfully!',
        facturaMuestra
    });

}

//Mostrar Hisotrial de Compras

export const shoppingHistory = async (req, res) => {
    const idUser = jwt.verify(token, process.env.PASSWEBTOKEN).userId;
    const compras = await Sale.find({ cliente: idUser });

    var productosComprados = [];
    compras.forEach(producto => {
        const { nombre, cantidad, precio, total } = producto;
        productosComprados.push({ nombre, cantidad, precio, total });
    });

    const comprasMuestra = compras.map(compra => {
        const productosComprados = compra.productos.map(producto => ({
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            precio_unitario: producto.precio,
            total: producto.total
        }));

        return {
            Fecha_de_compra: compra.fecha,
            Productos_comprados: productosComprados,
            Factura_No: compra.factura
        };
    });

    res.status(200).json({
        msg: 'These are your purchases',
        comprasMuestra
    });
}