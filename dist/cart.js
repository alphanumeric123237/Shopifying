import { CartLines } from "./cartLines";
import { v4 as uuidv4 } from "uuid";
export class Cart {
    constructor() {
        this._cartID = uuidv4();
    }
    addLine(merchID, merchQuantity) {
        const newLine = new CartLines(uuidv4(), merchID, merchQuantity);
        this._cartLines = [...this._cartLines, newLine];
    }
    clearCart() {
        this._cartLines = [];
    }
    get total() {
        return this._cartLines.length;
    }
    get CartID() {
        return this._cartID;
    }
    isEmpty() {
        return this._cartLines.length === 0;
    }
}
//# sourceMappingURL=cart.js.map