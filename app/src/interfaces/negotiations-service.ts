import { Negotiation } from '../models/negotiation.js';

export interface INegotiationsService {
  getTodayTrades(): Promise<Negotiation[]>;
}