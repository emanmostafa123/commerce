import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare let $ : any
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


  openAddUsrModal(){
    $('#addUsrModal').modal('show')
  }
  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/dashboard']);
  }
}
