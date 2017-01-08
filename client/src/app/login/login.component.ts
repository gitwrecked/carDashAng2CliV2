import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {SessionService} from '../common/session.service';

const template = require('./login.component.html');
const styles   = require('./login.component.css');

@Component({
  selector: 'app-login',
  template: template,
  styles: [styles],
  providers: [SessionService]
})
export class LoginComponent {
  public loginMsg;
  public loading;

  constructor(
      private router: Router, private http: Http,
      private sessionService: SessionService) {}

  login(event, email, password) {
    this.loading = true;
    event.preventDefault();

    let data = JSON.stringify({email, password});
     this.sessionService.login(data)
        .then(res => {
          this.loginMsg = (res.msg);
          if (res.success) {
            this.router.navigate(['usersInvestments']);
            window.location.reload();
          }
          this.loading = false;
        })
        .catch(function(err) {
          console.info("Unable to login user, is CarDash API up and running?");
        });
  }

  register(event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }
}
