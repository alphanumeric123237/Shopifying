import { CartLines } from "./CartLines";
import { v4 as uuidv4 } from "uuid";

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
}