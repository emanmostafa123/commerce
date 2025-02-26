import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

declare let $ : any
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tickets : any;
  mainTickets: any
  chosenTckt: any;
  addTcktForm:any;
  addusrForm: any;
  constructor(
    public router : Router,
    public rayahenService : RayahenService,
    public fb : FormBuilder,
  ) { 
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.rayahenService.getAllTickets(token).subscribe((res)=>{
      this.mainTickets = res.body
      this.tickets = this.mainTickets
    })
    this.addusrForm = this.fb.group({
      id: ['', [Validators.required]],
      email:['',[Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
    this.addTcktForm = this.fb.group({
      Title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      isactive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
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
    let token = localStorage.getItem('token')
    this.rayahenService.getTicketById(event , token).subscribe((res)=>{
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
  addUser(){
    let token = localStorage.getItem('token')
    if(!this.addusrForm.invalid){
      this.rayahenService.addUser(this.addusrForm.value , token).subscribe((res)=>{

      })
    }
  }
  openAddTcktModal(){
  $('#addTcktModal').modal('show')
  }
  addTckt(){
    let token = localStorage.getItem('token')
    this.addTcktForm.value.createdByUser =1;
    this.addTcktForm.value.isactive = true;
    debugger
    // if(!this.addTcktForm.invalid){
      this.rayahenService.addTickt(this.addTcktForm.value,token).subscribe((res)=>{
        // this.toastr.success('Hello world!', 'Toastr fun!');
      })
    // }
  }
  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/dashboard']);
  }
}
