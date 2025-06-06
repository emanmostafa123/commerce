import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './shared/authguard.guard';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { TicketsComponent } from './Components/tickets/tickets.component';
import { IssuesComponent } from './Components/issues/issues.component';
import { DisplayTicketComponent } from './Components/display-ticket/display-ticket.component';
import { FormControlsComponent } from './Components/form-controls/form-controls.component';
import { UserComponent } from './Components/user/user.component';
import { AllUserComponent } from './Components/all-user/all-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: '', component: LoginComponent },
  // {
  //     path: 'rayahen',
  //     component: DashboardComponent,
  //     canActivate:  [AuthGuard]
  // },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'rayahen', component: ChartsComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'ticket/:id', component: DisplayTicketComponent },
      { path: 'addTicket', component: FormControlsComponent},
      { path: 'updTicket/:id', component: FormControlsComponent},
      { path: 'adduser', component: UserComponent},
      { path: 'upduser/:id', component: UserComponent},
      { path: 'users', component: AllUserComponent},
      { path: '', redirectTo: 'rayahen', pathMatch: 'full' }, // Default child route
    ]
  },


];

