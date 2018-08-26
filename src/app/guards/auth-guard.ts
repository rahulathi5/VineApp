import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    // console.log('auth guard');
     let currentUser = JSON.parse(localStorage.getItem('vineUserData'));
     if(currentUser) {
       return true;
     }
     this.router.navigateByUrl('/login');
     return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    return this.canActivate(route, state);
  }
}