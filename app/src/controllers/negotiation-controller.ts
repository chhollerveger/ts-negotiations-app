import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logRuntime } from '../decorators/log-runtime.js';
import { DaysWeek } from '../enums/days-week.js';
import { Negotiation } from '../models/negotiation.js';
import { Negotiations } from '../models/negotiations.js';
import { NegotiationsService } from '../services/negotiations-service.js';
import { print } from '../utils/print.js';
import { MessageView } from '../views/message-view.js';
import { NegotiationsView } from '../views/negotiations-view.js';

export class NegotiationController {
  @domInjector('#date')
  private inputDate: HTMLInputElement;
  @domInjector('#quantity')
  private inputQuantity: HTMLInputElement;
  @domInjector('#value')
  private inputValue: HTMLInputElement;
  private negotiations = new Negotiations();
  private negotiationsView = new NegotiationsView('#negotiationsView');
  private messageView = new MessageView('#messageView');
  private negotiationsService = new NegotiationsService();

  constructor() {
    this.negotiationsView.update(this.negotiations);
  }

  @inspect()
  @logRuntime()
  public add(): void {
    const negotiation = Negotiation.create(
      this.inputDate.value,
      this.inputQuantity.value,
      this.inputValue.value
    );

    if (!this.checkBusinessDay(negotiation.date)) {
      this.messageView.update('Only business day trades are accepted!');
      return;
    }

    this.negotiations.add(negotiation);
    print(negotiation, this.negotiations);
    this.clearForm();
    this.updateView();
  }

  public importData(): void {
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

  private checkBusinessDay(date: Date) {
    return date.getDay() > DaysWeek.SUNDAY && date.getDay() < DaysWeek.SATURDAY;
  }

  private clearForm(): void {
    this.inputDate.value = '';
    this.inputQuantity.value = '';
    this.inputValue.value = '';
    this.inputDate.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update('Trading successfully added!');
  }
}
