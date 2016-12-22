import { Component }       from '@angular/core';
import { User }            from '../Models/user';
import { UsersService }    from '../users-service/users.service';
import { OnInit }          from '@angular/core';
import { Router }          from '@angular/router';
import { Purchase }        from '../Models/purchase';

const template = require('./purchase-history.component.html');
const styles   = require('./purchase-history.component.scss');

@Component({
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService]

})

export class PurchaseHistoryComponent {
  constructor(private router: Router, private usersService: UsersService) { }
  ngOnInit(): void {
    this.getPurchases();
  }
  public arrayOfKeys;

  users: User[];
  purchases: Purchase[];

  getPurchases(): void {
    this.usersService.getUsers().then(
      users => {       
        this.users = users;
      }
      ).catch(function(e) {        
        console.error(e); 
  });
  }
}


