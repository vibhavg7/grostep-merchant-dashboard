import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { ProfileResolverService } from './profile/profile-resolver.service';
// import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: UserDashboardComponent,
        children: [
            {
              path: 'profile',
              component: ProfileComponent,
              resolve: { resolvedProfile: ProfileResolverService}
            }
        ]
    }
];
@NgModule(
    {
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    }

)
export class UserRoutingModule {

}
