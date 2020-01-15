import { Component } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from './user/user.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;
  title = 'Merchant Dashboard';

  constructor(private authService: UserService, private router: Router) {
    router.events.subscribe((routerevent: Event) => {
      this.checkRouterEvent(routerevent);
    });
  }

  checkRouterEvent(navigatorEvent: Event) {
    if (navigatorEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (navigatorEvent instanceof NavigationEnd ||
      navigatorEvent instanceof NavigationError ||
      navigatorEvent instanceof NavigationCancel) {
      this.loading = false;
    }
  }

  togglemenu() {
    $('#wrapper').toggleClass('toggled');
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get userName() {
    const merchant = JSON.parse(localStorage.getItem('merchant'));
    return (merchant) ? merchant.store_name : '';
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

}
