import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, IAuthResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../../shared/placeholderDirective/placeholder.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnDestroy {
  loading = false;
  isLogginMode = true;
  closeSubscription!: Subscription;
  authObs!: Observable<IAuthResponse>;
  @ViewChild('f') authForm!: NgForm;
  @ViewChild(PlaceholderDirective, { read: ViewContainerRef })
  alertHost!: ViewContainerRef;
  constructor(private authService: AuthService)  {}

  switchLogged() {
    this.isLogginMode = !this.isLogginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    this.loading = true;
    const { email, password } = this.authForm.value;
    const authMethod = this.isLogginMode ? 'signIn' : 'signUp';
    this.authObs = this.authService[authMethod](email, password);
    this.authObs.subscribe({
      next: this.successAuth.bind(this),
      error: this.errorAuth.bind(this),
    });
    this.authForm.reset();
  }
  errorAuth(errMessage: string) {
    this.loading = false;

    this._showAlertError(errMessage);
  }
  successAuth() {
    this.loading = false;
  }

  private _showAlertError(msg: string) {
    this.alertHost.clear();
    const cmp = this.alertHost.createComponent(AlertComponent);
    cmp.instance.msg = msg;
    this.closeSubscription = cmp.instance.close$.subscribe(() => {
      cmp.destroy();
      this.closeSubscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
