import { CartLines } from "./cartLines";
import { v4 as uuidv4 } from "uuid";
import { AdminStoreFront } from "./AdminStorefront";

/**
 * Outlines a cart instance with its components
 */
export class Cart {
    private _cartID : string;
    private _cartLines : CartLines[] = [];

    /**
     * Creates a new Cart instance with a unique cart ID.
     */
    public constructor() {
        this._cartID = uuidv4();
    }

    /**
     * Adds a new line item to the cart.
     * @param merchID - The merchandise variant ID to add.
     * @param merchQuantity - The quantity of the merchandise.
     */
    public addLine(merchID : string, merchQuantity: number) : void{
        const newLine = new CartLines(uuidv4(), merchID, merchQuantity);
        this._cartLines = [...this._cartLines, newLine];
    }

    /**
     * Clears all items from the cart.
     */
    public clearCart(): void{
        this._cartLines = [];
    }
    
    /**
     * Gets the total number of line items in the cart.
     */
    public get total(): number {
        return this._cartLines.length;
    }

    /**
     * Gets the unique identifier for this cart.
     */
    public get CartID(): string {
        return this._cartID;
    }

    /**
     * Checks if the cart is empty.
     * @returns true if no line items exist in the cart, false otherwise.
     */
    public isEmpty(): boolean {
        return this._cartLines.length === 0;
    }

    /**
     * Maps the cart's line items to an array of objects formatted for Shopify's checkout mutation.
     * @returns An array of objects containing variantId and quantity as strings.
     */
    private mapLineItems() : {variantId : string, quantity : string}[]{
        let items : {variantId : string, quantity : string}[] = [];
        for (let i = 0; i < this._cartLines.length; i++) {
            items[i] = {
                variantId : this._cartLines[i].merchID,
                quantity: this._cartLines[i].productQuantity.toString()
            }
        }
        return items;
    }

    /**
     * Performs the checkout process by creating a Shopify checkout session.
     * Opens a new window with the checkout URL on success.
     * @returns A promise resolving to a status string describing the checkout outcome.
     */
    public async checkout() : Promise<string> {
        const STOREFRONT_ACCESS_TOKEN : string = "c0acb1e5870575922556e30a9406473f";
        let mutation : string = `
            mutation {
                checkoutCreate(input: {
                    lineItems: [${this.mapLineItems}]
                }) {
                    checkout {
                    id
                    webUrl
                    }
                    checkoutUserErrors {
                    message
                    }
                }
            }
        `;

        try{
            let fetchCheckout : any = await fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/api/2023-04/graphql.json`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN
                },
                body : JSON.stringify({query : mutation})
            });
            if (!fetchCheckout.ok) {
                return "Checkout failed: " + fetchCheckout.statusText;
            }
            let checkoutData : any = await fetchCheckout.json();
            window.open(checkoutData.data.checkoutCreate.checkout.webUrl);
            return "Successfully checked out, click on this link to complete checkout: " + checkoutData.data.checkoutCreate.checkout.webUrl
        } 
        catch(error : any) {
            return "Encountered error: " + error; 
        } 
    }
}