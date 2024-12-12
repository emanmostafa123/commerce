import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './shared/authguard.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:  [AuthGuard]
    }
    
];

