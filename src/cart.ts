import { CartLines } from "./cartLines";

class Cart extends CartLines{
    private cartID: string[]
    private cartLines: CartLines[];

    public addLine(merchID: string, merchQuantity: number): void{

    }
    
    public displayCart(): void{
        if (this.cartLines.length === 0){
            alert("This cart is empty");
            return;
        }
        this.cartLines.forEach(line => {
            console.log(line.toString());
        })
    }

    public getTotalQuantity(): number{
        return this.cartLines.reduce((total, line) => total + line.productQuantity, 0)
    }

    public removeLine(merchID: string): void {
        this.cartLines = this.cartLines.filter(line => line.merchID !== merchID);
        this.cartID = this.cartLines.map(line => line.cartLineID);
    }
}