import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  styleUrls: ['./alert.component.sass'],
  template: `<div class="backdrop" (click)="onClose()"></div>
    <div class="alert-box">
      <p>{{ msg }}</p>
      <div class="alert-box-actions">
        <button class="btn btn-primary" (click)="onClose()">Close</button>
      </div>
    </div> `,
})
export class AlertComponent {
  @Input() msg!: string;
  close$: Subject<void> = new Subject();
  onClose() {
    this.close$.next();
    console.log('close');
  }
}
