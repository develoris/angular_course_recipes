import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ClassProvider } from '@angular/core';
import AuthInterceptor from './components/auth/auth.interceptor';
const intecreptors: ClassProvider[] =  [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
@NgModule({
  providers: [
    ...intecreptors
  ]
})
export default class CoreModule{}
