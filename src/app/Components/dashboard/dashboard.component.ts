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
import Swal from 'sweetalert2';
import { AccumulationChartComponent } from '@syncfusion/ej2-angular-charts';

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
  updTcktForm:any;
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
  @ViewChild('chartComp') chartComponent: ChartsComponent | undefined;

  issueNm: any;
  selectedFile: File | undefined;
  chartSide: boolean | undefined;
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
    // this.getAllTickets()
    this.openNavElmnt('home')
    
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
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
      typeOfIssue:['', [Validators.required]],
      typeOfIssueId:['', [Validators.required]]
    })  
    this.updTcktForm = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
      typeOfIssue:['', [Validators.required]],
      typeOfIssueId:['', [Validators.required]],
      imageUrl:[''],
      userNameCreated:[''],
      createdOn:[''],
      readFlg:['']
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
 openLangDrop(){
  $('#langDropMenu').toggleClass('show')
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
      this.openChart()
    } 
    if(event == 'tickets'){
      this.showHome = false
      this.showIssues = false
      this.showTckts = true
      this.getAllTickets()
      this.chartSide = false
    }

    if(event == 'addIssue'){
      // this.openModal('addIssueModal')
      this.showHome = false
      this.showTckts = false
      this.getAllIssues()
      this.showIssues = true
      this.chartSide = false
    }
  }
  openChart(){
    this.chartSide = true
    this.chartComponent?.refreshChart();

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
      this.rayahenService.addUser(this.addusrForm.value , token).subscribe({
      next:(res)=>{
        console.log(res)
          this.toastMessage = "Done"
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this.closeModal('addUsrModal')
      } ,
      error: (err) =>{
        console.log(err)
        this.toastMessage = err.error.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      },
      // })
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
  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      return;
    }
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();
    if (modalId === 'addUsrModal') {
      this.openNavElmnt(modalId);
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
          this.uploadImage()
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this.getAllTickets()
          this.closeModal('addTcktModal')
        }
      })

  }
  updTckt(event:any){
    const ticket = Object.entries(event);
    console.log(ticket)
    ticket.forEach((element:any)=>{
      let control = element[0]
      let val = element[1]
      this.updTcktForm.controls[control].setValue(val)
    })
    this.openModal('updTcktModal')
  }
  submitUpdTicket(){
    let token = localStorage.getItem('token')
    this.rayahenService.updTicket(this.updTcktForm.value,token).subscribe({
      next:(res)=>{
        console.log(res)
      }
    })

  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  uploadImage(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    // this.http.post('https://your-api-endpoint.com/upload', formData)
    //   .subscribe({
    //     next: (res) => console.log('Upload success:', res),
    //     error: (err) => console.error('Upload error:', err)
    //   });
  }

  getAllIssues(){
    let token = localStorage.getItem('token')
    this.rayahenService.getallIssues(token).subscribe((res)=>{
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
          this.closeModal('addIssueModal')
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
      this.toastMessage = res.body.message
      this.toastBgColor = 'bg-success'
      this.toastComponent.show();
      this. getAllIssues()
      this.closeModal('updIssueModal')
    })
  }
  deleteIssue(issueId : any, issueNm:any){
    Swal.fire({
      title: this.translate.instant('fire.issue.title'),
      text: this.translate.instant('fire.issue.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('fire.issue.confirmButtonText'),
      cancelButtonText: this.translate.instant('fire.issue.cancelButtonText'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        let token = localStorage.getItem('token')
        this.rayahenService.deleteIssue(issueId, token).subscribe({
          next: (res) => {
            this.toastMessage = res.body.message;
            this.toastBgColor = 'bg-success';
            this.toastComponent.show();
            this.getAllIssues();
          },
          error: (err) => {
            if (err.status === 400) {
              this.toastMessage = err.error.message
            } else if (err.status === 500) {
              this.toastMessage = 'Server Error: Please try again later.';
            } else {
              this.toastMessage = 'An unexpected error occurred.';
            }
            this.toastBgColor = 'bg-warning';
            this.toastComponent.show();
          }
        });
        
      }
    });

  }
  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/login']);
  }
}