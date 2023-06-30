import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, IAuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {
  loading = false;
  isLogginMode = true;
  errMsg = '';
  authObs!: Observable<IAuthResponse>;
  @ViewChild('f') authForm!: NgForm;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
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
    this.errMsg = errMessage;
  }
  successAuth(authResponse: IAuthResponse) {
    this.loading = false;
    this.router.navigate(['/recipes']);
  }
}
