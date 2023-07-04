import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div
    class="spinner-border text-primary"
    style="width: 6rem; height: 6rem;"
    role="status"
  >
    <span class="sr-only"></span>
  </div>`,
})
export class LoadingSpinnerComponent {}
