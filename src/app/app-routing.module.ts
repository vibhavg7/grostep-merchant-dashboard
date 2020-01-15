import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './home/login.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'catalog',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./catelog/catelog.module').then(m => m.CatelogModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)
  },
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
