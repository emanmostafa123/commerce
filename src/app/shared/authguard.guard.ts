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
      if(localStorage.getItem("token") != null) this.isAuthenticated = true
      if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    }
}
