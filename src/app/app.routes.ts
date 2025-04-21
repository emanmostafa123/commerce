import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './shared/authguard.guard';
import { LangingPageComponent } from './testComponents/langing-page/langing-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:  [AuthGuard]
    },
    // {
    //     path: 'newdashboard',
    //     component: LangingPageComponent,
    //     canActivate:  [AuthGuard]
    // }
    
];

