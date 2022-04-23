
import { View } from './view.js';

export class MessageView extends View<string> {

  protected template(message: string): string {
    return `<p class="alert alert-info">${message}</p>`
  }
}