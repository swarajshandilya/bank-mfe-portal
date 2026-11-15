import { Component, computed, signal } from '@angular/core';
import { Routes } from '@angular/router';
import { BankCard, RiskMeter } from '@bank/shared-ui';

@Component({
  selector: 'app-assessment',
  imports: [BankCard, RiskMeter],
  template: `
    <h2 class="mb-3">Credit Risk</h2>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card accent-card h-100">
          <div class="card-body">
            <div class="text-uppercase small text-muted mb-3">Inputs</div>
            <label class="form-label" for="income">Monthly income</label>
            <input
              id="income"
              class="form-control"
              type="number"
              [value]="income()"
              (input)="income.set(+$any($event.target).value)"
            />
            <label class="form-label mt-3" for="debt">
              Monthly debt payments
            </label>
            <input
              id="debt"
              class="form-control"
              type="number"
              [value]="debt()"
              (input)="debt.set(+$any($event.target).value)"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <lib-bank-card
          title="Debt-to-income"
          [value]="dti() + '%'"
          note="Lower is better"
        />
      </div>
      <div class="col-md-4">
        <div class="card accent-card h-100">
          <div class="card-body">
            <div class="text-uppercase small text-muted">Risk level</div>
            <div class="fs-3 fw-semibold mb-3" style="color: var(--bank-navy)">
              {{ riskLabel() }}
            </div>
            <lib-risk-meter [risk]="dti()" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Assessment {
  income = signal(5000);
  debt = signal(1500);
  dti = computed(() =>
    this.income() > 0 ? Math.round((this.debt() / this.income()) * 100) : 100
  );
  riskLabel = computed(() =>
    this.dti() < 30 ? 'Low' : this.dti() < 60 ? 'Moderate' : 'High'
  );
}

export const routes: Routes = [{ path: '', component: Assessment }];