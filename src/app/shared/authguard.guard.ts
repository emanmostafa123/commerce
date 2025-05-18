// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  isAuthenticated: boolean | undefined;
  constructor(
    public router : Router
  ){
    // this.isAuthenticated = false;
    // if(localStorage.getItem("token") != null) this.isAuthenticated = true
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isAuthenticated = false;
      let tokenStartTime = localStorage.getItem("tokenStartTime")
      let tokenExpTime = localStorage.getItem("tokenExpTime")
      debugger
      if (tokenStartTime && tokenExpTime) {
        const start = new Date(tokenStartTime).getTime();
        const end = new Date(tokenExpTime).getTime();    
      
        if (end - start <= 0) {
        localStorage.removeItem("token")
        localStorage.removeItem("tokenStartTime")
        localStorage.removeItem("tokenExpTime")
        this.isAuthenticated = false;
      }
    }
      if(localStorage.getItem("token") != null) this.isAuthenticated = true
      if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    }
}
