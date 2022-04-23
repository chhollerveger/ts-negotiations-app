export class Negotiations {
    constructor() {
        this.negotiation = [];
    }
    add(negotiation) {
        this.negotiation.push(negotiation);
    }
    list() {
        return this.negotiation;
    }
    forText() {
        return JSON.stringify(this.negotiation, null, 2);
    }
    alreadyExists(negotiation) {
        return JSON.stringify(this.negotiation) === JSON.stringify(negotiation.list());
    }
}
//# sourceMappingURL=negotiations.js.map