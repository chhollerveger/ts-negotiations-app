import { Negotiation } from '../models/negotiation.js';

export interface INegotiations {
  add(negotiation: Negotiation): void;
  list(): readonly Negotiation[];
  forText(): string;
}
