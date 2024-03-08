import Sale from "./sale.js";

export const confirmPurchase = async (req, res) => {
    const { NIT, numTarjeta, fechaVencimiento, nombreTitular, cvv } = req.body;
    
}