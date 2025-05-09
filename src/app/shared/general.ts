import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var bootstrap: any;
@Injectable({
  providedIn: 'root',
})

export class General {
    openNavElmnt?: (event: any) => void; 
    dirVal : any
    updTcktForm:any;
    ticketsStatusCount : any;
    chosenTckt:any
    showTckts: boolean = false;
    showIssues: any
    showHome: any
    chartSide: any
    showChart: any
    showSingleTckt: any;
    displayedTckt:any;
    userData: any;
showreturnBtn: any;
    constructor(
      public authService: AuthService
    ) {
      
    this.userData = this.authService.getDecodedToken();
    this.userData = this.transformUserData(this.userData);
    }
    transformUserData(user: any): any {
      if (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        user.role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        delete user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      }
      return user;
    }

    openModal(event: any){
        const modalElement = document.getElementById(event);
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        if(event == 'addUsrModal'){
          if (this.openNavElmnt) {
            this.openNavElmnt(event);
        }
        }
    }
    closeModal(modalId: string) {
      const modalElement = document.getElementById(modalId);
      if (!modalElement) {
        return;
      }
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide();
      if (modalId === 'addUsrModal') {
        if (this.openNavElmnt) {
            this.openNavElmnt(modalId);
        }
      }
    }
    
}