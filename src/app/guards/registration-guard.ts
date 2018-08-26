import { Injectable } from '@angular/core';
import { Router,
         CanActivate,
         ActivatedRouteSnapshot,
         CanActivateChild,
         RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RegistrationCheckGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       
       let regUser = JSON.parse(localStorage.getItem('vineRegistrationData')); 
       let currentUser = JSON.parse(localStorage.getItem('vineUserData'));            
    if(regUser) {
        // this.router.navigate(['../registration']);
        return true;
    } if(currentUser){
        this.router.navigate(['../feed']);
        return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}