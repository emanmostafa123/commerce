import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { General } from '../../shared/general';
import { RayahenService } from '../../Services/rayahen.service';
import { UserData } from '../../shared/userData';

@Component({
  selector: 'app-notifications',
  imports: [
    CommonModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications: any;
  constructor(
    private translate: TranslateService,
    public general: General,
    public rayahenService : RayahenService,
    public usrData: UserData
  ) { }

  ngOnInit(): void {
    this.getNotification()
  }
  getNotification(){
    this.rayahenService.getNotification(this.usrData.userData.UserId).subscribe({
      next: (res) => {
        this.notifications = res.body;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  openTicket(id: any) {
    this.rayahenService.getTicketById(id).subscribe({
      next: (res) => {
        this.general.displayedTckt = res.body.ticket
        this.general.showTckts = false;
        this.general.showHome = false
        this.general.showIssues = false
        this.general.chartSide = false
        this.general.showreturnBtn = false
        this.general.showSingleTckt = true;
        this.rayahenService.readTickt(id).subscribe()
        this.getNotification()

      }
    })
  }

  showNotification(){
    const notificationElement = document.getElementById('notifictaionDropMenu');
    if (notificationElement) {
      notificationElement.classList.toggle('show');
    }
  }
}
