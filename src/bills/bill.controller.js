
import Bill from './bill.js';

export const billEdit = async (req, res) => {
    const { id, comprador, fechaEmision, total } = req.body;
    await Bill.findByIdAndUpdate(id, { $set: { comprador: comprador, fechaEmision: fechaEmision, total: total } });
    const bill = await Bill.findById(id);

    res.status(200).json({ 
        msg: "Bill Updated Successfully",
        bill
    });
}