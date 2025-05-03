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
  selector: 'app-forget-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    ToastComponent
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  lang : any;
  forgetPassForm:any;
  toastMessage : any;
  toastBgColor :any;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  
  constructor(
    public translate : TranslateService,
    public general : General,
    public fb : FormBuilder,
    public rayahenService : RayahenService
  ){

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
  }
    ngOnInit(): void {
      this.forgetPassForm = this.fb.group({
        email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.required]],
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
     forgetPassword(){
      this.rayahenService.forgetPass(this.forgetPassForm.value).subscribe({
        next:(res)=>{
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-primary'
          this.toastComponent.show();
        },
        error:(err)=>{

        }
      })
     }
}
