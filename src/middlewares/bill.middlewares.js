import Bill from '../bills/bill.js';

//validar existencia de Bill
export const verifExistenceBill = async (id) => {
    const factura = await Bill.findById(id);
    if (!factura) {
        throw new Error(`The bill with id ${id} does not exist`);
    }
}