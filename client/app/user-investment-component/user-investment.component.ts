import { Component } from '@angular/core';
import { User } from '../user/user';
//service reqs
import { UsersService } from '../users-service/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from '../purchase/purchase';


@Component({

  templateUrl: 'user-investment.html',
  styleUrls: ['user-investment.css'],
  //get global styling to work
  // styles: [require('app.component.css')],
  providers: [UsersService]

})

export class UserInvestmentComponent{

  constructor(private router: Router,
   private usersService: UsersService) {
    this.isLoading = false;
    }
  ngOnInit(): void {
  	this.getPurchases();
  	this.getUsers();
  }

  public purchases: Purchase[];
  public users:User[];
  public userEmails: type[];
  // public emailList: Array<string> = [];
  // public amtArry: Array<number> = [];
  private isLoading;
  public doughnutChartLabels:Array<string> =[];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public chartClicked(e:any):void {
    // console.log(e);
  }
  public chartHovered(e:any):void {
    // console.log(e);
  }

 pupulateChart() {
 	// console.log("inside add user email");
 	// console.log(user);
 	var arrayLength = this.users.length;
   console.log("arrayLength");
 	console.log(arrayLength);
	for (var i = 0; i < arrayLength; i++) {
    	this.doughnutChartLabels.push(this.users[i].email);
      console.log("this.users[i]"+ this.users[i].email +" length: "+this.users[i].purchases.length);
      console.log();
      var amt = 0;
      for (var t = 0; t < this.users[i].purchases.length; t++) {
        amt = amt + this.users[i].purchases[t].amount;
        console.log("amt: "+amt);
      }
      this.doughnutChartData.push(amt);
		}
}

  getPurchases(): void {
    this.usersService.getPurchases().then(
      purchase => {
        this.purchases = purchase;
        console.log("purchases");
        console.log(this.purchases);
      }
      ).catch(function(e) {
      	console.log('Inside getPurchase Exception'); 
  		console.log(e); 
	});
  }

    getUsers(): void {
    this.usersService.getUsers().then(
      user => {
        this.users = user;
        console.log("users in component");
        console.log(this.users);
        this.pupulateChart();
        this.isLoading = true;

      }
      // data => doWork('text', data)
      ).catch(function(e) {
      	console.log('Inside getUsers Exception'); 
  		console.log(e); 
	});
  }
}
export interface type{
    email:string;
}

export interface amount{
	amt: number;
}



