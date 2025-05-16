import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';

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
      public authService: AuthService,
      public fb: FormBuilder,
    ) {
      // if(localStorage.getItem('token') != null){
      //   this.userData = this.authService.getDecodedToken();
      //   this.userData = this.transformUserData(this.userData);
      // }
      this.intializeObjects()
    }


    intializeObjects(){
        this.updTcktForm = this.fb.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            priority: ['', [Validators.required]],
            isActive: ['', [Validators.required]],
            createdByUser :['', [Validators.required]],
            typeOfIssue:['', [Validators.required]],
            typeOfIssueId:['', [Validators.required]],
            image:[''],
            imageUrl:[''],
            userNameCreated:[''],
            createdOn:[''],
            readFlg:['']
          })
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