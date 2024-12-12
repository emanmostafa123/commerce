import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    public router : Router
  ) { 
  }



  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/dashboard']);
  }
}
