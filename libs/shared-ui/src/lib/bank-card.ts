import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-bank-card',
  template: `
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <h6 class="text-muted">{{ title() }}</h6>
        <div class="display-6">{{ value() }}</div>
        <small class="text-muted">{{ note() }}</small>
      </div>
    </div>
  `,
})
export class BankCard {
  title = input.required<string>();
  value = input.required<string>();
  note = input('');
}