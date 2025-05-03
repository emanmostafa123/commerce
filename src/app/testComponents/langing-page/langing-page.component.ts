import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-langing-page',
  imports: [CommonModule, TranslateModule],
  templateUrl: './langing-page.component.html',
  styleUrl: './langing-page.component.scss'
})
export class LangingPageComponent {
  navItems: Array<{ icon: string; label: string; active?: boolean; collapsed?: boolean; }> | undefined
  constructor(
    public translate: TranslateService
  ) {
    this.intialinitialization()
  }
 
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  intialinitialization(){
    this.navItems = [
      { icon: 'bi-house', label: this.translate.instant('main.nav.home') },
      { icon: 'bi-airplane', label:  this.translate.instant('tickets.mainLabels.tckts') },
      { icon: 'bi-wallet', label:  this.translate.instant('tickets.mainLabels.allissue')  },
      { icon: 'bi-journal-text', label: this.translate.instant('tickets.mainLabels.adduser')}
    ];
  }
  activeUsers = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg'
  ];
  setActive(label: string) {
    this.navItems?.forEach(item => item.active = item.label === label);
  }
  
}
