import { Injectable } 			from '@angular/core';
import { Router, CanActivate } 	from '@angular/router';
import { tokenNotExpired } 		from 'angular2-jwt';
import { SessionService } 		from './session.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService:SessionService) {}

  canActivate():boolean {
    if(!this.sessionService.isLoggedIn()){    	
    	this.router.navigate(['login']);
    	return false;
    }
    return true;
  }
}
