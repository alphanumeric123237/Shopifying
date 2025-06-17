import { Order } from "./Order.js";
import { Cart } from "./Cart.js";

export class Checkout {
    private ID : string;
    private _cart : Cart;
    private webURL: string;
    private _userEmail: string;


    protected redirectToCheckout() : void{

    }

    public placeOrder() : Order{
        const orderID = Math.floor(Math.random() * 1000000); 
        const customerEmail = this._userEmail; // Pass from customer data
        const totalAmount = this._cart.total; 
        const orderDate = new Date();

        return new Order(orderID, customerEmail, totalAmount, orderDate);
    }
}