import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logRuntime } from '../decorators/log-runtime.js';
import { DaysWeek } from '../enums/days-week.js';
import { INegotiationsService } from '../interfaces/negotiations-service.js';
import { INegotiations } from '../interfaces/negotiations.js';
import { IView } from '../interfaces/view.js';
import { Negotiation } from '../models/negotiation.js';
import { print } from '../utils/print.js';

export class NegotiationController {
  @domInjector('#date')
  private inputDate: HTMLInputElement;
  @domInjector('#quantity')
  private inputQuantity: HTMLInputElement;
  @domInjector('#value')
  private inputValue: HTMLInputElement;

  constructor(
    private negotiations: INegotiations,
    private negotiationsView: IView,
    private messageView: IView,
    private negotiationsService: INegotiationsService
  ) {
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
