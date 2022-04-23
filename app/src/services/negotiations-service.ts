import { TodayTrade } from '../interfaces/today-trade.js';
import { Negotiation } from '../models/negotiation.js';

export class NegotiationsService {

  public async getTodayTrades(): Promise<Negotiation[]> {
    return fetch('http://localhost:8080/dados')
      .then(res => res.json())
      .then((data: TodayTrade[]) => {
        return data.map(todayData => {
          return new Negotiation(
            new Date(),
            todayData.vezes,
            todayData.montante
          )
        })
      });
  }
}