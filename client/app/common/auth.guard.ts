import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionService} from './session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(): boolean {
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
