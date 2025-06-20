"use strict";
class Login {
    constructor() {
        this._admins = [
            { email: "admin1@example.com", password: "adminpass1", role: "Admin" },
            { email: "admin2@example.com", password: "adminpass2", role: "Admin" },
        ];
        this._customers = [
            // Example customer
            {
                email: "customer1@example.com",
                password: "custpass1",
                role: "Customer",
                orderHistory: [],
                address: "",
                name: "",
            },
        ];
        this.setupEventListeners();
    }
    setupEventListeners() {
        const loginBtn = document.getElementById("login");
        const createAccountBtn = document.getElementById("create-new-account");
        loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent form submission if inside a form
            const inputs = this.getInputValues();
            if (!inputs)
                return;
            const role = this.login(inputs.email, inputs.password);
            if (role === "Admin") {
                window.location.href = "Admin.html";
            }
            else if (role === "Customer") {
                window.location.href = "final.html";
            }
            else {
                alert("Login failed. Please check your email or password.");
            }
        });
        createAccountBtn === null || createAccountBtn === void 0 ? void 0 : createAccountBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const inputs = this.getInputValues();
            if (!inputs)
                return;
            const success = this.createAccount(inputs.email, inputs.password);
            if (success) {
                alert("Account created! You can now log in.");
            }
            else {
                alert("Account creation failed. Email already exists.");
            }
        });
    }
    getInputValues() {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        if (!emailInput || !passwordInput)
            return null;
        return { email: emailInput.value, password: passwordInput.value };
    }
    login(email, password) {
        for (const admin of this._admins) {
            if (admin.email === email && admin.password === password) {
                return "Admin";
            }
        }
        for (const customer of this._customers) {
            if (customer.email === email && customer.password === password) {
                return "Customer";
            }
        }
        return "None";
    }
    createAccount(email, password) {
        if (this._customers.some((c) => c.email === email)) {
            return false; // email already taken
        }
        const newCustomer = {
            email,
            password,
            role: "Customer",
            orderHistory: [],
            address: "",
            name: "",
        };
        this._customers.push(newCustomer);
        return true;
    }
}
// Instantiate Login when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    new Login();
});
//# sourceMappingURL=Login.js.map