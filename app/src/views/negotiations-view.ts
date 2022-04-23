import { escape } from '../decorators/escape.js';
import { Negotiations } from '../models/negotiations.js';
import { View } from './view.js';

export class NegotiationsView extends View<Negotiations> {

  @escape()
  protected template(negotiations: Negotiations): string {
    return `
      <table class="table table-hover table-bordered">
          <thead>
              <tr>
                  <th>DATA</th>
                  <th>QUANTIDADE</th>
                  <th>VALOR</th>
              </tr>
          </thead>
          <tbody>
          ${negotiations.list().map(negotiation => {
            return `
                <tr>
                    <td>${this.formatDate(negotiation.date)}
                    </td>
                    <td>
                        ${negotiation.quantity}
                    </td>
                    <td>
                        ${negotiation.value}
                    </td>
                </tr>
            `;
          }).join('')}
            </tbody>
      </table>
    `;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat().format(date);
  }
}