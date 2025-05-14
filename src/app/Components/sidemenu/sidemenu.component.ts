import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/auth.service';
import { Router, RouterModule } from '@angular/router';
import { General } from '../../shared/general';

@Component({
  selector: 'app-sidemenu',
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  userData: any;
  lang: string | undefined;
  shownavElmnt: any;
  @Output() navEvent = new EventEmitter<string>();

  constructor(
    public translate: TranslateService,
    public authService: AuthService,
    public router : Router,
    public general: General
  ){
    const defaultLang = localStorage.getItem('lang') || 'en';
    this.lang = defaultLang
    if(this.lang == 'ar'){
      this.general.dirVal = 'rtl'
    }else{
      this.general.dirVal = 'ltr'
    }
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    
  }



  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/login']);
  }
}
