
class ObjectTaken {
    constructor(idProduct, cantidad) {
        this.idProduct = idProduct;
        this.cantidad = cantidad;
    }

    viewObject() {
        console.log(`[OBJECTTAKEN] | ID: ${this.idProduct} - CANTIDAD: ${this.cantidad} \n`);
    }

}

export default ObjectTaken;