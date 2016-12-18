import { Component, OnInit } 		from '@angular/core';
import { Router }         from '@angular/router';
import { UsersService } 			from '../users-service/users.service';

const styles   = require('./main-nav.component.css');
const template = require('./main-nav.component.html');

@Component({
  // moduleId: module.id,
  selector: 'main-nav',
  templateUrl: template,
  styles: [styles],
  providers: [UsersService]
})

export class MainNavComponent implements OnInit {
	constructor(private usersService: UsersService, public router: Router) {}

	public loggedIn:Boolean;

	ngOnInit():void {
		this.loggedIn = this.usersService.isLoggedIn();
	}

	logout():void {
		this.usersService.logout();
		this.loggedIn = false;
		// this.router.navigate(['userAmt']);
	}
}