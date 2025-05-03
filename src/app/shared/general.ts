import { Injectable } from '@angular/core';

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
    showTckts: any
    showIssues: any
    showHome: any
    chartSide: any
    showChart: any
    constructor() {
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