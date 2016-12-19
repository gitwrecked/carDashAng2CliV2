import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { Http }           from '@angular/http';
import { headers }        from '../common/headers';
import { UsersService }   from '../users-service/users.service';

const styles   = require('./login.component.css');
const template = require('./login.component.html');

@Component({
  selector: 'login',
  template: template,
  styles: [ styles ],
  providers: [
    UsersService
  ]
})
export class LoginComponent {
  constructor(public router: Router, public http: Http, public usersService: UsersService) {
  }

  public loginMsg:string;


  login(event, email, password) {
    event.preventDefault();

    let body = JSON.stringify({ email, password });
    this.http.post('/api/v1/auth/login', body, { headers: headers})
      .subscribe(
        response => {
          let res = response.json();
          console.log(JSON.stringify(res));
          this.loginMsg = (res.msg || res.message);
          if(res.success) {            
            localStorage.setItem('cd_token', res.cd_token);            
            this.router.navigate(['/usersamt']);
            // reloading window until service is changed to observable
            window.location.reload();            
          }
        },
        error => {          
          console.error(error.text());
        }
      );
  }

  register(event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }
}
