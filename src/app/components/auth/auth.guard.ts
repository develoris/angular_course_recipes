import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsRoutesService {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    return inject(AuthService).user.pipe(
      take(1),
      map((user) => (user ? true : this.router.createUrlTree(['/auth'])))
    );
  }
}

export const canActivateRoute: CanActivateFn = () =>
  inject(PermissionsRoutesService).canActivate();
