"use strict";
class AccountCreator {
    constructor() {
        this._customers = [];
        this.loadCustomers();
        this.setupEventListener();
    }
    setupEventListener() {
        const confirmBtn = document.getElementById("Confirm");
        confirmBtn === null || confirmBtn === void 0 ? void 0 : confirmBtn.addEventListener("click", () => {
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            const addressInput = document.getElementById("address");
            const email = emailInput.value;
            const password = passwordInput.value;
            const address = addressInput.value;
            if (email === "" || password === "" || address === "") {
                alert("Please fill in all fields before continuing.");
                return;
            }
            const success = this.createAccount(email, password, address);
            if (success) {
                alert("Account created! Redirecting to login page...");
                window.location.href = "login.html";
            }
            else {
                alert("Email already exists. Try logging in instead.");
            }
        });
    }
    // check the array first and see if the input email is duplicated
    // if yes, return false
    // if no, add a new customer to the array, and store it
    createAccount(email, password, address) {
        for (let i = 0; i < this._customers.length; i++) {
            if (this._customers[i].email === email) {
                return false;
            }
        }
        const newCustomer = {
            email,
            password,
            role: "Customer",
            address,
            orderHistory: []
        };
        this._customers[this._customers.length] = newCustomer;
        this.saveCustomers();
        alert("Account created! You can now log in.");
        window.location.href = "login.html";
        return true;
    }
    saveCustomers() {
        localStorage.setItem("customers", JSON.stringify(this._customers));
    }
    loadCustomers() {
        const stored = localStorage.getItem("customers");
        if (stored)
            this._customers = JSON.parse(stored);
    }
}
new AccountCreator();
//# sourceMappingURL=CreateAccount.js.map