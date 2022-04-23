var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Negotiation } from '../models/negotiation.js';
export class NegotiationsService {
    getTodayTrades() {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch('http://localhost:8080/dados')
                .then(res => res.json())
                .then((data) => {
                return data.map(todayData => {
                    return new Negotiation(new Date(), todayData.vezes, todayData.montante);
                });
            });
        });
    }
}
//# sourceMappingURL=negotiations-service.js.map