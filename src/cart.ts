import { CartLines } from "./cartLines";
import { v4 as uuidv4 } from "uuid";
import { AdminStoreFront } from "./AdminStorefront";

export class Cart {
    private _cartID : string;
    private _cartLines : CartLines[];

    public constructor() {
        this._cartID = uuidv4();
    }

    public addLine(merchID : string, merchQuantity: number) : void{
        const newLine = new CartLines(uuidv4(), merchID, merchQuantity);
        this._cartLines = [...this._cartLines, newLine];
    }

    public clearCart(): void{
        this._cartLines = [];
    }
    
    public get total(): number {
        return this._cartLines.length;
    }

    public get CartID(): string {
        return this._cartID;
    }

    public isEmpty(): boolean {
        return this._cartLines.length === 0;
    }
    private mapLineItems() : {variantId : string, quantity : string}[]{
        let items : {variantId : string, quantity : string}[] = [];
        for (let i = 0; i < this._cartLines.length; i++) {
            items[i] = {
                variantId : `variantId: "${this._cartLines[i].merchID}"`,
                quantity: `quantity: ${this._cartLines[i].productQuantity.toString()}`
            }
        }
        return items;
    }
    public async checkout() : Promise<string> {
        const STOREFRONT_ACCESS_TOKEN : string = "c0acb1e5870575922556e30a9406473f";
        let mutation : string = `
            mutation {
                checkoutCreate(input: {
                    lineItems: ${this.mapLineItems}
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
                body : JSON.stringify({mutation})
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