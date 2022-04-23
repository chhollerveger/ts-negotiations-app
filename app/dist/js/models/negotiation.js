export class Negotiation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    static create(date, quantity, value) {
        const formattedDate = new Date(date.replace(/-/g, ','));
        const formattedQuantity = parseInt(quantity);
        const formattedValue = parseFloat(value);
        return new Negotiation(formattedDate, formattedQuantity, formattedValue);
    }
    get volume() {
        return this.quantity * this.value;
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    forText() {
        return `
      Date: ${this.date},
      Quantity: ${this.quantity},
      Value: ${this.value}
    `;
    }
    alreadyExists(negotiation) {
        return this.date.getDate() === negotiation.date.getDate()
            && this.date.getMonth() === negotiation.date.getMonth()
            && this.date.getFullYear() === negotiation.date.getFullYear();
    }
}
//# sourceMappingURL=negotiation.js.map