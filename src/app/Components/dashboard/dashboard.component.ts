import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import $ from 'jquery';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartsComponent } from '../charts/charts.component';
import { ToastComponent } from "../toast/toast.component";
import Swal from 'sweetalert2';
import { AccumulationChartComponent } from '@syncfusion/ej2-angular-charts';
import { TicketsComponent } from "../tickets/tickets.component";
import { General } from '../../shared/general';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

// declare let $ : any
declare var bootstrap: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule,FormsModule,
    SidemenuComponent, ChartsComponent, ToastComponent, TicketsComponent],
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
  deactiveArray: { isActive: boolean }[] = [];
  activeArray: { isActive: boolean }[] = [];
  constructor(
    public router : Router,
    public rayahenService : RayahenService,
    public fb : FormBuilder,
    public authService : AuthService,
    public general : General,
    private translate: TranslateService) {
    this.general.openNavElmnt = this.openNavElmnt.bind(this);

    const defaultLang = localStorage.getItem('lang') || 'en';
    this.lang = defaultLang
    if(this.lang == 'ar'){
      this.general.dirVal = 'rtl'
      this.lang = 'العربية'
    }else{
      this.general.dirVal = 'ltr'
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
    this.general.updTcktForm = this.fb.group({
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
    this.rayahenService.getAllTickets().subscribe({
      next: (res) => {
      this.mainTickets = res.body
      this.tickets = this.mainTickets
      this.showTckts = true
      this.activeArray = []
      this.deactiveArray = []
      this.mainTickets.forEach((ticket : any) => {
        if (ticket.isActive === true) this.activeArray.push(ticket as { isActive: boolean });
        if (ticket.isActive === false) this.deactiveArray.push(ticket as { isActive: boolean });
                      
      })
      const activeCount = this.activeArray.length;
      const inactiveCount = this.deactiveArray.length;
      this.general.ticketsStatusCount = [
        {
          label : 'allTcktCount',
          count: this.mainTickets.length
        },
        {
          label : 'activeTckt',
          count: activeCount
        },
        {
          label : 'deactiveTckt',
          count: inactiveCount
        },
      ]
      },
      error:(err)=>{
        this.toastMessage = err.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      }
    })
 }
 openLangDrop(){
  $('#langDropMenu').toggleClass('show')
 }
 switchLanguage(lang: string) {
  this.lang = lang
  if(lang == 'ar'){
    this.general.dirVal = 'rtl'
    this.lang = 'العربية'
  }else{
    this.general.dirVal = 'ltr'
  }
  $('#langDropMenu').removeClass('show')
  this.translate.use(lang);
  localStorage.setItem('lang', lang);
}

  //
  // Apply the transformation
  handleNavEvent(eventValue: string) {
    this.openNavElmnt(eventValue)
    console.log('Event received in parent component:', eventValue);
  }
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
      this.getAllTickets()
      this.showTckts = false
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


  openImg(imageUrl:any){
    window.open(imageUrl, '_blank');

  }
  addUser(){
    if(!this.addusrForm.invalid){
      this.rayahenService.addUser(this.addusrForm.value ).subscribe({
      next:(res)=>{
        console.log(res)
          this.toastMessage = "Done"
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this.general.closeModal('addUsrModal')
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

  
  addTckt(){
    this.addTcktForm.value.createdByUser = this.userData.UserId;
    this.addTcktForm.value.isActive = true;
    debugger
    // if(!this.addTcktForm.invalid){
    this.allIssues.forEach((issue:any)=>{
      if(this.addTcktForm.value.typeOfIssue == issue.name) this.addTcktForm.value.typeOfIssueId = issue.id
    })
    debugger
      this.rayahenService.addTickt(this.addTcktForm.value).subscribe((res)=>{
        if(res.status == 200 ){
          this.uploadImage()
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this.getAllTickets()
          this.general.closeModal('addTcktModal')
        }
      })

  }

  submitUpdTicket(){
    this.rayahenService.updTicket(this.general.updTcktForm.value,this.general.updTcktForm.value.id).subscribe({
      next:(res)=>{
        console.log(res)
        this.getAllTickets()
        this.toastMessage = 'Done'
        this.toastBgColor = 'bg-success'
        this.toastComponent.show();
        this.general.closeModal('updTcktModal')
      },
      error:(err)=>{
        console.log(err)
        this.toastMessage = err.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
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
    this.rayahenService.getallIssues().subscribe((res)=>{
      this.allIssues = res.body
    })
  }
  addNewIssue(){
      this.rayahenService.addIssue(this.addIssueForm.value).subscribe((res)=>{
        if(res.status == 201 ){
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this. getAllIssues()
          this.general.closeModal('addIssueModal')
        }
      })
    // }
  }
  openIssue(issueId : any, issueNm:any){
    this.issueID = issueId
    this.issueNm = issueNm
    this.general.openModal('updIssueModal')
  }
  updateIssue( ){
    this.updIssueForm.value.id = this.issueID
    this.rayahenService.updIssue(this.updIssueForm.value).subscribe((res)=>{
      this.toastMessage = res.body.message
      this.toastBgColor = 'bg-success'
      this.toastComponent.show();
      this. getAllIssues()
      this.general.closeModal('updIssueModal')
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
        this.rayahenService.deleteIssue(issueId).subscribe({
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
    localStorage.removeItem('tokenStartTime')
    localStorage.removeItem('tokenExpTime')
    this.router.navigate(['/login']);
  }
}