import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';
import { CommonModule } from '@angular/common';
declare let $ : any
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tickets : any;
  mainTickets: any
  chosenTckt: any;
  constructor(
    public router : Router,
    public rayahenService : RayahenService
  ) { 
  }

  ngOnInit(): void {
    this.rayahenService.getAllTickets().subscribe((res)=>{
      this.mainTickets = res.body
      this.tickets = this.mainTickets
    })
  }
  getTickets(event :  any){
    if(event == 'all'){
      this.tickets = this.mainTickets
    }else if(event == 'active'){
      this.tickets = this.mainTickets.filter((ticket:any) => ticket.isActive == true)
    }else if(event == 'deactive'){
      this.tickets = this.mainTickets.filter((ticket:any) => ticket.isActive == false)
    }
  }
  getTicketbyId(event:any){
    this.rayahenService.getTicketById(event).subscribe((res)=>{
      this.chosenTckt = res.body
      $('#displayTcktModal').modal('show')
    })
  }
  openImg(imageUrl:any){
    window.open(imageUrl, '_blank');

  }
  openAddUsrModal(){
    $('#addUsrModal').modal('show')
  }
  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/dashboard']);
  }
}
