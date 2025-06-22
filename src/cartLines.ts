export class CartLines{
    protected _cartLineID: string;
    protected _merchID: string;
    protected _productQuantity: number;

    public constructor(cartLineID: string, merchID: string, productQuantity: number){
        this._cartLineID = cartLineID;
        this._merchID = merchID;
        this._productQuantity = productQuantity;
    }

    public get cartLineID(): string{
        return this._cartLineID;
    }

    public get merchID(): string{
        return this._merchID;
    }

    public get productQuantity(): number{
        return this._productQuantity;
    }

    public set productQuantity(quantity: number){
        if (quantity < 0) throw new Error();
        this._productQuantity = quantity;
    }

    public updateQuantity(amount: number): void{
        const newQuantity = this._productQuantity + amount;
        if (newQuantity < 0) throw new Error();
        this._productQuantity = newQuantity;

    }

    public toString(): string {
        return `Line: ${this._cartLineID} | Item ID: ${this._merchID} | Quantity: ${this._productQuantity}`;
    }
}