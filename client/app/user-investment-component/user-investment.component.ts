import { Component } from '@angular/core';
import { User } from '../user/user';
//service reqs
import { UsersService } from '../users-service/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({

  templateUrl: 'user-investment.html',
  // styleUrls: ['user-investment.css'],
  //service reqs
  providers: [UsersService]

})

export class UserInvestmentComponent{

	
}