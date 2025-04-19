import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import $ from 'jquery';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartsComponent } from '../charts/charts.component';
import { ToastComponent } from "../toast/toast.component";
// declare let $ : any
declare var bootstrap: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ChartsComponent, ToastComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tickets : any;
  mainTickets: any
  chosenTckt: any;
  addTcktForm:any;
  addusrForm: any;
  shownavElmnt: any;
  userData: any;
  addIssueForm: any;
  lang: string | undefined;
  dirVal: string;
  getTckts: any;
  showHome: any;
  showTckts: any;
  allIssues: any;
  showIssues: any;
  updIssueForm: any;
  issueID: any;
  toastMessage: any;
  toastBgColor:any;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  issueNm: any;
  constructor(
    public router : Router,
    public rayahenService : RayahenService,
    public fb : FormBuilder,
    public authService : AuthService,
    private translate: TranslateService) {

    const defaultLang = localStorage.getItem('lang') || 'en';
    this.lang = defaultLang
    if(this.lang == 'ar'){
      this.dirVal = 'rtl'
    }else{
      this.dirVal = 'ltr'
    }
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.userData = this.authService.getDecodedToken();
    this.userData = this.transformUserData(this.userData);
    console.log(this.userData )
  }

  ngOnInit(): void {
    this.getTckts = 'all'
    this.shownavElmnt = 'tickets'
    this.getAllTickets()
    this.openNavElmnt('home')
    // interface Ticket {
    //   id: number;
    //   subject: string;
    //   priority:number;
    //   description: string;
    //   imgUrl: string;
    //   isActive: boolean;
    // }
    
    // const tickets: Ticket[] = [
    //   {
    //     id: 1,
    //     subject: "Login Issue",
    //     priority: 1,
    //     description: "User unable to log in with correct credentials.",
    //     imgUrl: "https://example.com/images/login-issue.png",
    //     isActive: true,
    //   },
    //   {
    //     id: 2,
    //     subject: "Page Not Loading",
    //     priority: 2,
    //     description: "The dashboard page is taking too long to load.",
    //     imgUrl: "https://example.com/images/page-load.png",
    //     isActive: false,
    //   },
    //   {
    //     id: 3,
    //     subject: "Feature Request: Dark Mode",
    //     priority: 3,
    //     description: "User requested a dark mode feature for better accessibility.",
    //     imgUrl: "https://example.com/images/dark-mode.png",
    //     isActive: true,
    //   },
    //   {
    //     id: 4,
    //     subject: "Payment Gateway Error",
    //     priority: 1,
    //     description: "Some users report failed transactions while making payments.",
    //     imgUrl: "https://example.com/images/payment-error.png",
    //     isActive: true,
    //   },
    //   {
    //     id: 5,
    //     subject: "Email Notifications Not Sent",
    //     priority: 2,
    //     description: "Users are not receiving email confirmations for orders.",
    //     imgUrl: "https://example.com/images/email-issue.png",
    //     isActive: false,
    //   }
    // ];
    // this.mainTickets= tickets
    
    // this.tickets = this.mainTickets
    
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
      isActive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
      typeOfIssue:['', [Validators.required]],
      typeOfIssueId:['', [Validators.required]]
    })
    this.addIssueForm = this.fb.group({
      name : ['']
    })
    this.updIssueForm = this.fb.group({
      name : [''],
      id : ['']
    })
  
  this.getAllIssues()
  }
  transformUserData(user: any): any {
    if (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
      user.role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      delete user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return user;
  }
  
 getAllTickets(){
  let token = localStorage.getItem('token')
    this.rayahenService.getAllTickets(token).subscribe((res)=>{
      this.mainTickets = res.body
      this.tickets = this.mainTickets
    })
 }
  // language 
  switchLanguage(lang: string) {
    this.lang = lang
    if(lang == 'ar'){
      this.dirVal = 'rtl'
      this.lang = 'العربية'
    }else{
      this.dirVal = 'ltr'
    }
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
  //
  // Apply the transformation
 
  //P@ssw0rd
  openNavElmnt(event:any, openIssueodal?:boolean){
    this.shownavElmnt = event
    if(event == 'home'){
      this.showTckts = false
      this.showIssues = false
      this.showHome = true
    } 
    if(event == 'tickets'){
      this.showHome = false
      this.showIssues = false
      this.showTckts = true
    }

    if(event == 'addIssue'){
      // this.openModal('addIssueModal')
      this.showHome = false
      this.showTckts = false
      this.getAllIssues()
      this.showIssues = true
    }
  }
  getTickets(event :  any){
    this.getTckts = event
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
      console.log(res)
      this.chosenTckt = res.body.ticket
      this.openModal('displayTcktModal')
    })
  }
  openImg(imageUrl:any){
    window.open(imageUrl, '_blank');

  }
  addUser(){
    let token = localStorage.getItem('token')
    if(!this.addusrForm.invalid){
      this.rayahenService.addUser(this.addusrForm.value , token).subscribe((res)=>{

      })
    }
  }
  openModal(event: any){
      const modalElement = document.getElementById(event);
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      if(event == 'addUsrModal'){
        this.openNavElmnt(event)
      }
  }
  addTckt(){
    let token = localStorage.getItem('token')
    this.addTcktForm.value.createdByUser =1;
    this.addTcktForm.value.isActive = true;
    debugger
    // if(!this.addTcktForm.invalid){
    this.allIssues.forEach((issue:any)=>{
      if(this.addTcktForm.value.typeOfIssue == issue.name) this.addTcktForm.value.typeOfIssueId = issue.id
    })
    debugger
      this.rayahenService.addTickt(this.addTcktForm.value,token).subscribe((res)=>{
        if(res.status == 200 ){
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this.getAllTickets()
          console.log(res)
        }
      })

  }

  getAllIssues(){
    let token = localStorage.getItem('token')
    this.rayahenService.getallIssues(token).subscribe((res)=>{
      console.log(res)
      this.allIssues = res.body
    })
  }
  addNewIssue(){
    let token = localStorage.getItem('token')
   
      this.rayahenService.addIssue(this.addIssueForm.value,token).subscribe((res)=>{
        if(res.status == 201 ){
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this. getAllIssues()
        }
      })
    // }
  }
  openIssue(issueId : any, issueNm:any){
    this.issueID = issueId
    this.issueNm = issueNm
    this.openModal('updIssueModal')
  }
  updateIssue( ){
    let token = localStorage.getItem('token')
    this.updIssueForm.value.id = this.issueID
    this.rayahenService.updIssue(this.updIssueForm.value,token).subscribe((res)=>{
      // this.toastr.success('Hello world!', 'Toastr fun!');
      this. getAllIssues()
    })
  }
  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/login']);
  }
}
