import { escape } from '../decorators/escape.js';
import { INegotiations } from '../interfaces/negotiations.js';
import { View } from './view.js';

export class NegotiationsView extends View<INegotiations> {

  @escape()
  protected template(negotiations: INegotiations): string {
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