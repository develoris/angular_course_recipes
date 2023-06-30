import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import UserModel from './user.model';

export interface IAuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localid: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<UserModel | null>(null);
  constructor(private http: HttpClient) {}

  /**
   *
   * @param {string} email
   * @param { string } password
   * @return {Observable<IAuthResponseks>}
   */
  signIn(email: string, password: string): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQqxa6OEKlTdb7w9GY0SX2jYcIYTt6HJg',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localid,
            resData.idToken,
            +resData.expiresIn * 1000
          );
        })
      );
  }
  /**
   *
   * @param {string} email
   * @param { string } password
   * @return {Observable<IAuthResponse>}
   */
  signUp(email: string, password: string): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQqxa6OEKlTdb7w9GY0SX2jYcIYTt6HJg',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localid,
            resData.idToken,
            +resData.expiresIn * 1000
          );
        })
      );
  }

  logOut(){
    this.user.next(null);
  }

  /**
   *
   * @param { string } email
   * @param { string } userId
   * @param { string } token
   * @param { number } expiresIn validity of token expressed in milliseconds
   */
  handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
  }

  errorHandler(err: any) {
    let errorMessage = 'An unknown error occurred';
    if (!err.error.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exist';
        break;
      case 'INVALID_PASSWORD':
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email or Password wrong';
    }
    return throwError(() => errorMessage);
  }

  pipeSign(){
    return
  }
}
