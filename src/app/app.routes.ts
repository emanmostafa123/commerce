import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './shared/authguard.guard';
import { LangingPageComponent } from './testComponents/langing-page/langing-page.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path:'forgetpassword', component: ForgetPasswordComponent},
    { path: '', component: LoginComponent },
    {
        path: 'rayahen',
        component: DashboardComponent,
        canActivate:  [AuthGuard]
    },
    
    // {
    //     path: 'newdashboard',
    //     component: LangingPageComponent,
    //     canActivate:  [AuthGuard]
    // }
    
];

