import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var bootstrap: any;
@Injectable({
  providedIn: 'root',
})

export class General {
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
    ticketsAdded: boolean = false;
shownavElmnt: any;
    constructor(
      public authService: AuthService
    ) {
      // if(localStorage.getItem('token') != null){
      //   this.userData = this.authService.getDecodedToken();
      //   this.userData = this.transformUserData(this.userData);
      // }
    }


    


  openNavElmnt(event:any){
    this.shownavElmnt = event
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