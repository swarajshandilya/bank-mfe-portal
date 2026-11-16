import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-bank-card',
  template: `
    <div class="card h-100 border-0 shadow-sm bank-card">
      <div class="card-body">
        <div class="label">{{ title() }}</div>
        <div class="value">{{ value() }}</div>
        <small class="text-muted">{{ note() }}</small>
      </div>
    </div>
  `,
  styles: `
    .bank-card {
        border-top: 3px solid var(--bank-accent, #13a89e) !important;
        border-radius: 0.5rem;
    }
    .value {
        font-size: 2rem;
        font-weight: 600;
        color: var(--bank-navy, #0b2545);
    }
    .label {
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.75rem;
      color: #6b7280;
    }
  `,
})
export class BankCard {
  title = input.required<string>();
  value = input.required<string>();
  note = input('');
}