import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/auth.service';
import { Router, RouterModule } from '@angular/router';
import { General } from '../../shared/general';
import { UserData } from '../../shared/userData';

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
  lang: string | undefined;
  shownavElmnt: any;
  @Output() navEvent = new EventEmitter<string>();
  isCollapsed: boolean | undefined = false;

  constructor(
    public translate: TranslateService,
    public authService: AuthService,
    public router : Router,
    public general: General,
    public usrData : UserData
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

  toggleSidebar(){
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    localStorage.removeItem("token") ;
    this.router.navigate(['/login']);
  }
}
