import { Order } from "./Order.js";
import { Cart } from "./Cart.js";
import { Checkout } from "./Checkout.js";

class CustomerStoreFront {
    private _customerID : string;
    private _email : string;
    private _cart: Cart;
    private _orders: Order[] = [];
    private _checkout: Checkout | null = null;
    private _userAddress: string;

    public constructor(customerID: string, email: string){
        this._customerID = customerID;
        this._email = email;
        this._cart = new Cart();
    }

    public get customerID() : string{
        return this._customerID
    }

    public get email() : string{
        return this._email;
    }

    private checkOrderStatus() : string {
        // condition: We don't always have orders
        if (this._orders.length === 0){
            return "You have no order."
        }

        let status = "";
        for (let i = 0; i < this._orders.length; i++){
            const order = this._orders[i];
            status += "Order ID:" + order.orderID + " - Status: " + order["orderStatus"] + "\n";
            if (i !== this._orders.length - 1){
                status += "\n";
            }
        }

        return status;
    }

    private changeZone(newZone: string) : string {
        this._userAddress = newZone;

        return "Your address is updated to: " + newZone

    }

    private changeDetails(newEmail: string) : void {
        this._email = newEmail;
    }

    private checkOut() : void {
        // Condition: There is always in the cart before customers add something to it
        if (this._cart.isEmpty()) {
            alert("Your cart is empty.")
            return
        }

        this._checkout = new Checkout(this._cart, this._email);
        const newOrder = this._checkout.placeOrder();

        this._orders[this._orders.length] = newOrder;

    }

    private cartCreate() : boolean {
        if (!this._cart) {
            this._cart = new Cart();
            return true;
        }

        return false
    }

    private cartDelete() : boolean {
        if (this._cart) {
            this._cart.clearCart();
            return true;
        }

        return false;
    }

    private addToCart(merchID: string, merchQuantity: number) : boolean {
        if (!merchID || merchQuantity <= 0) {
            return false;
        }

        this._cart.addLine(merchID, merchQuantity)
        return true;


    }

    protected redirectedToCheckout() : void {
        alert("Redirecting to checkout")
        this.checkOut();
    }

    private returnOption() : string {
        const order = this._orders[this._orders.length - 1];
        if (!order){
            return "No order found";
        }

        const result = order.requestReturn();
        return `Return Status: ${result}`;
    }
}