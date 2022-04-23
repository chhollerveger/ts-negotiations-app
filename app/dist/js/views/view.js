export class View {
    constructor(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            throw Error(`Selector ${selector} does not exist in the DOM. Check!`);
        }
        this.element = element;
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
//# sourceMappingURL=view.js.map