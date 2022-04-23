import { Model } from '../interfaces/model.js';
import { Negotiation } from './negotiation.js';

export class Negotiations implements Model<Negotiations> {
  private negotiation: Negotiation[] = [];

  public add(negotiation: Negotiation) {
    this.negotiation.push(negotiation);
  }

  public list(): readonly Negotiation[] {
    return this.negotiation;
  }

  public forText(): string {
    return JSON.stringify(this.negotiation, null, 2);
  }

  public alreadyExists(negotiation: Negotiations): boolean {
    return JSON.stringify(this.negotiation) === JSON.stringify(negotiation.list());
  }
}
