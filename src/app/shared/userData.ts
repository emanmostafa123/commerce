import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare var bootstrap: any;
@Injectable({
  providedIn: 'root',
})

export class UserData {
    userData: any;

    constructor( private authService: AuthService) {   
         if(localStorage.getItem('token') != null){
        this.userData = this.authService.getDecodedToken();
        this.userData = this.transformUserData(this.userData);
      }
    }
        transformUserData(user: any): any {
      if (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        user.role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        delete user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      }
      return user;
    }
}