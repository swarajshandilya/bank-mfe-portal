import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { BankCard } from '@bank/shared-ui';

@Component({
  selector: 'app-home',
  imports: [BankCard],
  template: `
    <div class="row g-3">
      <div class="col-md-6">
        <lib-bank-card
          title="Accounts"
          value="3"
          note="Shell-owned content"
        />
      </div>
      <div class="col-md-6">
        <lib-bank-card title="Alerts" value="2" />
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