
import Bill from './bill.js';
import User from '../users/user.js';

export const billEdit = async (req, res) => {
    const { id, comprador, fechaEmision, total } = req.body;
    await Bill.findByIdAndUpdate(id, { $set: { comprador: comprador, fechaEmision: fechaEmision, total: total } });
    const bill = await Bill.findById(id);

    res.status(200).json({
        msg: "Bill Updated Successfully",
        bill
    });
}

export const viewBills = async (req, res) => {
    const allBills = await Bill.find();
    const bills = allBills.map(bill => {
        return {
            comprador: bill.comprador,
            fechaEmision: bill.fechaEmision,
            total: bill.total
        }
    });
    res.status(200).json({
        msg: "|------------BILLS------------|",
        bills
    });
}

export const viewBillsByClient = async (req, res) => {
    const { nombreComprador } = req.body;
    const client = await User.findOne({ userName: nombreComprador });
    const idCliente = client._id;
    const allBills = await Bill.find({ comprador: idCliente });
    const bills = allBills.map(bill => {
        return {
            comprador: bill.comprador,
            fechaEmision: bill.fechaEmision,
            products: bill.productos,
            total: bill.total
        }
    });
    res.status(200).json({
        msg: "|------------BILLS BY CLIENT------------|",
        bills
    });
}