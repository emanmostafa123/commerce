import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeclarationHelper } from '../../shared/DeclarationHelper';
import { Router, RouterModule } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import $ from 'jquery';
import { General } from '../../shared/general';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    ToastComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm : any
  lang: string;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  toastMessage: any;
  toastBgColor: any;

  constructor(
    public fb : FormBuilder,
    public router : Router,
    public rayahenService : RayahenService,
    private translate: TranslateService,
    public general : General
  ) { 
    
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
    if(localStorage.getItem("token") != null) this.router.navigate(['/dashboard'])
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: ['', [Validators.pattern(/^[0-9]*$/)]],
      password: ['', [Validators.required]],
    })
  }
  
  // language 
  switchLanguage(lang: string) {
    this.lang = lang
    if(lang == 'ar'){
      this.general.dirVal = 'rtl'
      this.lang = 'العربية'
    }else{
      this.general.dirVal = 'ltr'
    }
    $('#langDropMenuLogin').removeClass('show')
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
  
  openLangDrop(){
    $('#langDropMenuLogin').toggleClass('show')
   }
  //
  // c
  getIDData(event:any){
    let pattern = /^[0-9]*$/;
    if (!pattern.test(event.key)) {
      console.log(this.loginForm)
    }
  }
  login(){
    console.log(this.loginForm)
    if(!this.loginForm.invalid){
      this.rayahenService.login(this.loginForm.value).subscribe({
        next:(res)=>{
        debugger
        console.log("res",res)
        if(res.body.success != false){
        localStorage.setItem('token',res.body.data.token) 
        this.router.navigate(['/dashboard'])
        this.getLoginDate()
        this.getExpDate()
        }else{
          this.toastMessage = 'Invalid ID or Password'
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
        }
      },
      error:(err)=>{
        console.log('err',err)
        
        this.toastMessage = err.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      }
    })

    }
  }
  getLoginDate() {
    const date = new Date();
    localStorage.setItem('tokenStartTime', date.toISOString());

  }
  getExpDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    localStorage.setItem('tokenExpTime', date.toISOString());

  }
}


