export class Order {
    private orderID : number;
    private totalAmount: number;
    private _orderStatus : string;


    public updateStatus() : string {

    };

    public assignShipping() : string {

    };

    protected get orderStatus() : string{
        return ''
    }

    private checkInventory(productName : string) : string{
        
    }
}