var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logRuntime } from '../decorators/log-runtime.js';
import { DaysWeek } from '../enums/days-week.js';
import { Negotiation } from '../models/negotiation.js';
import { print } from '../utils/print.js';
export class NegotiationController {
    constructor(negotiations, negotiationsView, messageView, negotiationsService) {
        this.negotiations = negotiations;
        this.negotiationsView = negotiationsView;
        this.messageView = messageView;
        this.negotiationsService = negotiationsService;
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.create(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (!this.checkBusinessDay(negotiation.date)) {
            this.messageView.update('Only business day trades are accepted!');
            return;
        }
        this.negotiations.add(negotiation);
        print(negotiation, this.negotiations);
        this.clearForm();
        this.updateView();
    }
    importData() {
        this.negotiationsService
            .getTodayTrades()
            .then(todayTrades => {
            return todayTrades.filter(todayTrade => {
                return !this.negotiations.list().some(negotiation => negotiation.alreadyExists(todayTrade));
            });
        })
            .then(todayTrades => {
            for (let negotiation of todayTrades) {
                this.negotiations.add(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
    }
    checkBusinessDay(date) {
        return date.getDay() > DaysWeek.SUNDAY && date.getDay() < DaysWeek.SATURDAY;
    }
    clearForm() {
        this.inputDate.value = '';
        this.inputQuantity.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Trading successfully added!');
    }
}
__decorate([
    domInjector('#date')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#quantity')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInjector('#value')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect(),
    logRuntime()
], NegotiationController.prototype, "add", null);
//# sourceMappingURL=negotiation-controller.js.map