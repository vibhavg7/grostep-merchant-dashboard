import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string) {
    if (localStorage.getItem('merchant')) {
      // logged in so return true
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;

  }


}
