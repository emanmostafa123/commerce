import { Component, Host, HostListener } from '@angular/core';
import { General } from '../../shared/general';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  imports: [],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {
  lang: any;
  constructor(private translate: TranslateService, 
    private general: General) {
      const defaultLang = localStorage.getItem('lang') || 'en';
    this.lang = defaultLang
    if(this.lang == 'ar'){
      this.general.dirVal = 'rtl'
      this.lang = 'العربية'
    }else{
      this.general.dirVal = 'ltr'
    }
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
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement ;
    const langDropMenu = document.getElementById('langDropMenu');
    if (target.id !== 'langDropMenu' && target.id !== 'langDropBtn' && target.id !== 'dropdownMenuLinklang' ) {
      if (langDropMenu) {
        langDropMenu.classList.remove('show');
      }
    }
  }
}
