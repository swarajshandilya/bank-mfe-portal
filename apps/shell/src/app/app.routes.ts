import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { BankCard } from '@bank/shared-ui';

@Component({
  selector: 'app-home',
  imports: [BankCard],
  template: `
  <h2 class="mb-3">Dashboard</h2>
  <div class="row g-3">
    <div class="col-md-4">
      <lib-bank-card title="Total balance" value="$128,450" note="Across 3 accounts" />
    </div>
    <div class="col-md-4">
      <lib-bank-card title="Accounts" value="3" note="Shell-owned content" />
    </div>
    <div class="col-md-4">
      <lib-bank-card title="Alerts" value="2" note="1 needs review" />
    </div>
  </div>
  <div class="card accent-card mt-4">
    <div class="card-body">
      <h5 class="mb-3">Recent activity</h5>
      <table class="table mb-0">
        <thead>
          <tr><th>Date</th><th>Description</th><th class="text-end">Amount</th></tr>
        </thead>
        <tbody>
         <tr><td>Nov 14</td><td>Payroll deposit</td><td class="text-end amount-in">+$4,200.00</td></tr>
<tr><td>Nov 13</td><td>Mortgage payment</td><td class="text-end amount-out">-$1,350.00</td></tr>
<tr><td>Nov 12</td><td>Index fund purchase</td><td class="text-end amount-out">-$500.00</td></tr>
        </tbody>
      </table>
    </div>
  </div>
`,
})
export class Home {}

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: Home },
  {
    path: 'wealth',
    loadChildren: () =>
      loadRemoteModule('wealth', './routes').then((m) => m.routes),
  },
  {
    path: 'credit-risk',
    loadChildren: () =>
      loadRemoteModule('credit-risk', './routes').then((m) => m.routes),
  },
];