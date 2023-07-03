import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
})
export class AlertComponent {
  @Input() msg!: string;
  close$: Subject<void> = new Subject();
  onClose() {
    this.close$.next();
    console.log('close');
  }
}
