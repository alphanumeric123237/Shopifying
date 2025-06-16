type OrderStatus =  "Pending" | "Processing" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";

type ReturnStatus = "None" | "Requested" | "Approved" | "Rejected" | "Returned";


export class Order {
    private _orderID : number;
    private _totalAmount: number;
    private _orderStatus : OrderStatus;
    private _returnStatus : ReturnStatus
    private _customerName: string;
    private _mailingAddress: string;
    private _destination: string;
    private _orderDate: Date;
    private _shippingDate: Date;
    private _deliveryDate: Date;

    public constructor(){
        // since it always starts at "Pending" stage
        // so I make it equals to "Pending"
        this._orderStatus = "Pending";

        // since customers do not necessarily return their products
        // so I make it equals to "None"
        this._returnStatus = "None";
    }

    public get orderID() : number{
        return this._orderID;
    }

    public get totalAmount() : number{
        return this._totalAmount;
    }

    public get customerName() : string{
        return this._customerName;
    }

    public get mailingPlace() : string{
        return this._mailingAddress;
    }

    public get destination() : string{
        return this._destination;
    }

    public get orderDate() : Date{
        return this._orderDate;
    }

    public get shippedDate() : Date{
        return this._shippingDate;
    }

    public get deliveryDate() : Date{
        return this._deliveryDate;
    }

   
    // keep track of the status of the order
    // will be returned as a string and shown it to user
    public updateStatus() : string { 
        switch (this._orderStatus){
            case "Pending": this._orderStatus = "Processing";
                break;

            case "Processing": this._orderStatus = "Shipped";
                break;

            case "Shipped": this._orderStatus = "Out for Delivery";
                break;

            case "Out for Delivery": this._orderStatus = "Delivered";
                break;

            // It should be the final status of the whole process
            // so nothing needs to update
            case "Delivered":
                break;

            // once the order is cancelled, it cannot update
            // and go directly to this step
            case "Cancelled":
                break;
        }

        return this._orderStatus;
    }

    // for a customer to cancel the order
    // this method will be called in CustomerStoreFront and let them to cancel order
    // it defines when customer can cancel and when not
    public cancelOrder(): string {
        if (this._orderStatus === "Pending" || this._orderStatus === "Processing") {
            this._orderStatus = "Cancelled";
            return "Your order has been cancelled"
        }

        return `Order cannot be cancelled at status: ${this._orderStatus}`;
 
    }

    // request a return
    // this method will be called in CustomerStoreFront and let them to return the delievered order
    // it defines when products can be returned and when not
    public requestReturn() : string {
        if (this._orderStatus !== "Delivered"){
            return "Return can only be requested after deliery.";
        }

        if (this._returnStatus !== "None"){
            return `Return already requested: ${this._returnStatus}`
        }

        this._returnStatus = "Requested";
        return "Request submitted."
    }

    // admin will either approve or reject the return each order
    public returnApproval(approve: boolean): string{
        // 
        if (this._returnStatus !== "Requested"){
            return `No request to handle.`
        }

        if(approve){
            this._returnStatus = "Approved";
            return "Return has been approved";
        }

        else{
            this._returnStatus = "Rejected";
            return "Returned has been rejected."
        }
    }

    // track the product, whether the return is confirmed or not
    public confirmReturned() : string{
        if(this._returnStatus !== "Approved"){
            return "Return is not approved yet, please wait until related information is sent to your email."
        }

        this._returnStatus = "Returned"
        return "Item successfully returned";
    }

    // assign shippinng when the order is at a specific status
    public assignShipping(companyAddress: string, daysRequired: number, destination: string) : string {
        if (this._orderStatus !== "Processing") {
            return "Order cannot be shipped."
        }

        this._mailingAddress = companyAddress;
        this._destination = destination;
        this._shippingDate = new Date();
        this._deliveryDate = new Date(this._shippingDate.getTime() + daysRequired * 86400000);
        this._orderStatus = "Shipped";

        return `Shipping is assigned to ${destination} from ${companyAddress}. The estimated delivery will be: ${this._deliveryDate.toDateString()}`
    };

    protected get orderStatus() : string{
        return this._orderStatus;
    }
}