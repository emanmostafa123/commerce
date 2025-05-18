import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import $ from 'jquery';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartsComponent } from '../charts/charts.component';
import { ToastComponent } from "../toast/toast.component";
import { General } from '../../shared/general';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { LanguageSwitchComponent } from "../language-switch/language-switch.component";
import { NotificationsComponent } from '../notifications/notifications.component';
import { UserData } from '../../shared/userData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FormsModule, LanguageSwitchComponent,
    NotificationsComponent, RouterModule,
    SidemenuComponent, ToastComponent, LanguageSwitchComponent],
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
  allIssues: any;
  showIssues: any;
  updIssueForm: any;
  issueID: any;
  toastMessage: any;
  showSingleTckt:any;
  toastBgColor:any;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  @ViewChild('chartComp') chartComponent: ChartsComponent | undefined;

  issueNm: any;
  selectedFile: File | undefined;
  deactiveArray: { isActive: boolean }[] = [];
  activeArray: { isActive: boolean }[] = [];
  constructor(
    public router : Router,
    public rayahenService : RayahenService,
    public fb : FormBuilder,
    public authService : AuthService,
    public general : General,
    public usrData : UserData,
    private translate: TranslateService) {

    const defaultLang = localStorage.getItem('lang') || 'en';
    this.lang = defaultLang
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  ngOnInit(): void {
    this.getTckts = 'all'
    this.shownavElmnt = 'tickets'
    // this.getAllTickets()
    
    this.addusrForm = this.fb.group({
      id: ['', [Validators.required]],
      email:['',[Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
    
   
  
  }
 
  
 getAllTickets(){
    this.rayahenService.getAllTickets().subscribe({
      next: (res) => {
      this.mainTickets = res.body
      this.tickets = this.mainTickets
      this.general.showTckts = true
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
 

  //
  // Apply the transformation
 
  //P@ssw0rd
 
  openChart(){
    this.general.chartSide = true
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



 

 
  
  logout(){
    localStorage.removeItem("token") ;
    localStorage.removeItem('tokenStartTime')
    localStorage.removeItem('tokenExpTime')
    this.router.navigate(['/login']);
  }
}