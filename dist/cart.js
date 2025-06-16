import { CartLines } from "./cartLines";
class Cart extends CartLines {
    addLine(merchID, merchQuantity) {
    }
    displayCart() {
        if (this.cartLines.length === 0) {
            alert("This cart is empty");
            return;
        }
        this.cartLines.forEach(line => {
            console.log(line.toString());
        });
    }
    getTotalQuantity() {
        return this.cartLines.reduce((total, line) => total + line.productQuantity, 0);
    }
}
//# sourceMappingURL=cart.js.map