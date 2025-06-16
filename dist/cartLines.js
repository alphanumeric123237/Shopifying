export class CartLines {
    constructor(cartLineID, merchID, productQuantity) {
        this._cartLineID = cartLineID;
        this._merchID = merchID;
        this._productQuantity = productQuantity;
    }
    get cartLineID() {
        return this._cartLineID;
    }
    get merchID() {
        return this._merchID;
    }
    get productQuantity() {
        return this._productQuantity;
    }
    set productQuantity(quantity) {
        if (quantity < 0)
            throw new Error();
        this._productQuantity = quantity;
    }
    updateQuantity(amount) {
        const newQuantity = this._productQuantity + amount;
        if (newQuantity < 0)
            throw new Error();
        this._productQuantity = newQuantity;
    }
    toString() {
        return `Line: ${this._cartLineID} | Item ID: ${this._merchID} | Quantity: ${this._productQuantity}`;
    }
}
//# sourceMappingURL=cartLines.js.map