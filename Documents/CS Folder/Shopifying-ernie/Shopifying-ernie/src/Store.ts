import { StringLiteral } from "typescript";

abstract class Store{
    private _storeName : String = '';
    private _storeBanner : string;
    public canvas = document.getElementById("canvas") as HTMLCanvasElement
  


    public draw() : void{

    }

    public displayProduct() : void{

    }

    public login(email: string, password: number) {

    }

    public createAccount(email: string, password: number) : boolean {
        
    } 

}