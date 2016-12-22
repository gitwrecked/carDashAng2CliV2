import { Component, OnInit }	from '@angular/core';
import { Router }         		from '@angular/router';
import { SessionService } 		from '../common/session.service';

const template = require('./main-nav.component.html');
const styles   = require('./main-nav.component.scss');

@Component({
  selector: 'main-nav',
  templateUrl: template,
  styles: [styles],
  providers: [SessionService]
})

export class MainNavComponent implements OnInit {
	constructor(
		private sessionService: SessionService, 
		private router: Router) {
	}

    public sessionUser = this.sessionService.getSession();	

    ngOnInit():void {
    	this.sessionUser = this.sessionService.getSession();
    }

	logout():void {
		this.sessionService.logout();
		this.router.navigate(['/usersInvestments']);
		window.location.reload();		
	}
}