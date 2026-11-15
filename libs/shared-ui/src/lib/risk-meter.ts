import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lib-risk-meter',
  template: `
    <div
      class="progress"
      role="progressbar"
      aria-label="Risk level"
      [attr.aria-valuenow]="width()"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="progress-bar"
        [class.bg-danger]="risk() >= 60"
        [class.bg-warning]="risk() >= 30 && risk() < 60"
        [class.bg-success]="risk() < 30"
        [style.width.%]="width()"
      >
        {{ risk() }}%
      </div>
    </div>
  `,
})
export class RiskMeter {
  risk = input.required<number>(); // 0-100
  width = computed(() => Math.min(100, Math.max(0, this.risk())));
}