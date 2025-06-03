import { Component, ViewChild } from '@angular/core';
import { General } from '../../shared/general';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { RayahenService } from '../../Services/rayahen.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-user',
  imports: [
    CommonModule,
    ToastComponent,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.scss'
})
export class AllUserComponent {
toastMessage: any;
toastBgColor: any;
 @ViewChild('toastRef') toastComponent!: ToastComponent;
  allUsers: any;
  constructor(
    public general: General,
    private rayahenService: RayahenService,
    public translate : TranslateService,
    public router: Router
  ) {
    this.general.openNavElmnt('users')
    this. getAllUsers()
  }
  getAllUsers() {
    this.rayahenService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res.body)
        this.allUsers = res.body;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updUser(event: any) {
    localStorage.setItem('userUpd', JSON.stringify(event));
    localStorage.setItem('userUpd', JSON.stringify(event))
    this.router.navigate(['/upduser/'+event.id])
  }
  // Add methods and properties as needed for the component functionality
}
