export class ShopifyOrderManager {
    constructor() {
        this._orders = [];
    }
    // simply add an order after a customer orders something
    addOrder(order) {
        this._orders[this._orders.length] = order;
    }
    // remove an order when a customer cancels an order
    removeOrder(order) {
        let orderFound = false;
        for (let i = 0; i < this._orders.length; i++) {
            if (this._orders[i].orderID === order.orderID) {
                orderFound = true;
                for (let j = i; j < this._orders.length - 1; j++) {
                    this._orders[j] = this._orders[j + 1];
                }
            }
            this._orders.length--;
        }
        return orderFound;
    }
    // sort out the order array using quicksort
    // based on the orderID
    sortOrder(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        const pivot = arr[arr.length - 1];
        const leftArr = [];
        const rightArr = [];
        let leftSize = 0;
        let rightSize = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].orderID < pivot.orderID) {
                leftArr[leftSize] = arr[i];
                leftSize++;
            }
            else {
                rightArr[rightSize] = arr[i];
                rightSize++;
            }
        }
        return [...this.sortOrder(leftArr), pivot, ...this.sortOrder(rightArr)];
    }
    // use binary search to search through the array
    // seems like a good way to revise what we have done in the semester :)
    findOrder(orderID) {
        // sort it once before searching :))
        this._orders = this.sortOrder(this._orders);
        let left = 0;
        let right = this._orders.length - 1;
        while (left < right) {
            const midIndex = Math.floor((left + right) / 2);
            const orderAtTheMid = this._orders[midIndex];
            if (orderAtTheMid.orderID === orderID) {
                return orderAtTheMid;
            }
            else if (orderAtTheMid.orderID < orderID) {
                left = midIndex + 1;
            }
            else {
                right = midIndex - 1;
            }
        }
        return undefined;
    }
    // list out all the orders in the array 
    // for the manager/admin to check
    listOrders() {
        return this._orders;
    }
}
//# sourceMappingURL=ShopifyOrderManager.js.map