import { NegotiationController } from "../controllers/negotiation-controller.js";
import { Negotiations } from "../models/negotiations.js";
import { NegotiationsService } from "../services/negotiations-service.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

export const makeNegotiationControllerFactory = (): NegotiationController => {
  const negotiations = new Negotiations();
  const negotiationsView = new NegotiationsView('#negotiationsView');
  const messageView = new MessageView('#messageView');
  const negotiationsService = new NegotiationsService();
  return new NegotiationController(
    negotiations,
    negotiationsView,
    messageView,
    negotiationsService
  );
}