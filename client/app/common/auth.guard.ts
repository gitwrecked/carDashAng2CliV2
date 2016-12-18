import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('cd_token')) {
      return true;
    }
    console.log('User is not logged in');
    this.router.navigate(['/login']);
    return false;
  }
}
