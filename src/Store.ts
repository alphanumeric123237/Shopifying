type Role = "Customer" | "Admin" | "None"


interface Product{
    name: string;
    id: string;
    price: number;
    color: string;
}

interface User{
    email: string
    password: string
}

interface Customer extends User{
    role : Role;
    orderHistory: string[];
    address: string;
    name: string;
}

interface Admin extends User{
    role: Role;
}

class Store{
    private storeName: string = '';
    private storeBanner: string;
    private canvas = document.getElementById("canvas") as HTMLCanvasElement;
    private ctx = this.canvas.getContext("2d")!;
    private products: Product[] = [];
    private cart: Product[] = [];
    private _admins: User[] = [];
    private _customers: Customer[] = [];

    public constructor(product: Product[]){
        this.products = product;
        this.draw();
        this.displayProducts();
        this.canvas.addEventListener("click", this.handleClick.bind(this));

        
    }

    public draw(): void{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillRect(0, 0, this.canvas.width, 80);

        this.ctx.fillText(this.storeBanner, 30, 50);

        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width - 50, 40, 25, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText("🛒", this.canvas.width - 62, 48);
        this.ctx.fillText(`${this.cart.length}`, this.canvas.width - 30, 48);



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

    public handleClick(mouse: MouseEvent): void{
        const rect = this.canvas.getBoundingClientRect();
        const mx = mouse.clientX - rect.left;
        const my = mouse.clientY - rect.top;

        let x = 50;
        let y = 120;

        for (const product of this.products){
            const btnX = x + 10;
            const btnY = y + 120;
            const btnW = 180;
            const btnH = 20;

            if (mx >= btnX && mx <= btnX + btnW && my >= btnY && my <= btnY + btnH){
                this.cart.push(product);
                this.draw();
                this.displayProducts();
                return;
            }

            x += 250;
            if (x + 200 > this.canvas.width){
                x = 50;
                y += 200;
            }
        }
        const dist = Math.hypot(mx - (this.canvas.width - 50), my - 40);
        if (dist <= 25) {
            alert(`Cart:\n${this.cart.map(p => `${p.name} - $${p.price.toFixed(2)}`).join("\n")}`);
        }
    }

    // a login validator helps identify whether the user is an admin or customer
    public login(email: string, password: string): string{
        for (let i = 0; i < this._admins.length; i++){
            const admin = this._admins[i];
            if(admin.email === email && admin.password === password){
                return "Welcome Admin."
            }
        }

        for (let i = 0; i < this._customers.length; i++){
            const customer = this._customers[i];
            if (customer.email === email && customer.password === password){
                return "Welcome Customer"
            }
        }

        return "Login failed, please retry or create account"
    }

    // it helps to create a new account
    // and push it to the customer array
    public createAccount(email: string, password: string): boolean{
        for (let i = 0; i < this._customers.length; i++){
            if (this._customers[i].email === email){
                return false;
            }
        }

        const newCustomer : Customer ={
            email: email,
            password: password,
            role: "Customer",
            orderHistory: [],
            address: "",
            name: ""
        }

        this._customers[this._customers.length] = newCustomer;
        return true;
    }
}