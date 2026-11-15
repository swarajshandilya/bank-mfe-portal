import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BankCard } from '@bank/shared-ui';

@Component({
  selector: 'app-portfolio',
  imports: [BankCard],
  template: `
    <h2 class="mb-3">Wealth Management</h2>
    <div class="row g-3">
      <div class="col-md-4">
        <lib-bank-card
          title="Portfolio value"
          value="$482,300"
          note="+4.2% YTD"
        />
      </div>
      <div class="col-md-4">
        <lib-bank-card title="Equities" value="62%" note="Target 60%" />
      </div>
      <div class="col-md-4">
        <lib-bank-card title="Bonds" value="38%" note="Target 40%" />
      </div>
    </div>
  `,
})
export class Portfolio {}

export const routes: Routes = [{ path: '', component: Portfolio }];