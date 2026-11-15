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

    <div class="card accent-card mt-4">
      <div class="card-body">
        <h5 class="mb-3">Top holdings</h5>
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Holding</th>
              <th>Type</th>
              <th class="text-end">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Global equity index fund</td>
              <td>Equity</td>
              <td class="text-end">$210,000</td>
            </tr>
            <tr>
              <td>Dividend growth fund</td>
              <td>Equity</td>
              <td class="text-end">$89,000</td>
            </tr>
            <tr>
              <td>Government bond fund</td>
              <td>Bonds</td>
              <td class="text-end">$140,000</td>
            </tr>
            <tr>
              <td>Corporate bond fund</td>
              <td>Bonds</td>
              <td class="text-end">$43,300</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="fw-semibold">
              <td colspan="2">Total</td>
              <td class="text-end">$482,300</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
})
export class Portfolio {}

export const routes: Routes = [{ path: '', component: Portfolio }];