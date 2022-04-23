import { Model } from '../interfaces/model.js';

export class Negotiation implements Model<Negotiation> {
  constructor(
    private _date: Date,
    public readonly quantity: number,
    public readonly value: number
  ) { }

  public static create(date: string, quantity: string, value: string): Negotiation {
    const formattedDate = new Date(date.replace(/-/g, ','));
    const formattedQuantity = parseInt(quantity);
    const formattedValue = parseFloat(value);
    return new Negotiation(formattedDate, formattedQuantity, formattedValue);
  }

  get volume(): number {
    return this.quantity * this.value;
  }

  get date(): Date {
    const date = new Date(this._date.getTime());
    return date;
  }

  public forText(): string {
    return `
      Date: ${this.date},
      Quantity: ${this.quantity},
      Value: ${this.value}
    `;
  }

  public alreadyExists(negotiation: Negotiation): boolean {
    return this.date.getDate() === negotiation.date.getDate()
      && this.date.getMonth() === negotiation.date.getMonth()
      && this.date.getFullYear() === negotiation.date.getFullYear();
  }
}
