import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { General } from '../../shared/general';

@Component({
  selector: 'app-sidemenu',
  imports: [
    TranslateModule,
    CommonModule
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
    this.userData = this.authService.getDecodedToken();
    this.userData = this.transformUserData(this.userData);
    console.log(this.userData )
    this.openNavElmnt('home')
    // this.general.openNavElmnt = this.openNavElmnt.bind(this);
  }
  transformUserData(user: any): any {
    if (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
      user.role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      delete user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return user;
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
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  openNavElmnt(event:any, openIssueodal?:boolean){
    this.shownavElmnt = event
    this.navEvent.emit(event);
  }

  

  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/login']);
  }
}
