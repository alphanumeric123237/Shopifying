interface Product{
    name: string;
    id: string;
    price: number;
    color: string;
}

export class Store{
    private storeName: string = '';
    private storeBanner: string;
    private canvas = document.getElementById("canvas") as HTMLCanvasElement;
    private ctx = this.canvas.getContext("2d")!;
    private products: Product[] = [];
    private cart: Product[] = [];

    private button = {
        x: 100,
        y: 60,
        width: 100,
        height: 40,
        radius: 10,
        text: "Add to Cart"
    };
    
    public constructor() {
        const canvasElement = document.getElementById("canvas") as HTMLCanvasElement | null;

        if (!canvasElement) {
            throw new Error("Canvas element not found");
        }

        const context = canvasElement.getContext("2d");
        if (!context) {
            throw new Error("2D context not supported");
        }
    }
    private drawAddToCartButton(): void {
        const { x, y, width, height, radius, text } = this.button;

        this.ctx.fillStyle = "#28a745";
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "white";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, x + width / 2, y + height / 2);
    }

    public displayProducts(): void{
        let x = 50;
        let y = 120;

        for (const products of this.products){
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(x, y, 200, 150);
            this.ctx.strokeStyle = "#ccc";
            this.ctx.strokeRect(x, y, 200, 150);
        }
    }

    private handleClick(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const { x, y, width, height } = this.button;

        if (
            clickX >= x &&
            clickX <= x + width &&
            clickY >= y &&
            clickY <= y + height
        ) {
            alert("Item added to cart!");
        }
    }
}