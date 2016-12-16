import { Component } from '@angular/core';
import { User } from '../user/user';
//service reqs
import { UsersService } from '../users-service/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from '../purchase/purchase';

@Component({

  templateUrl: 'user-investment.html',
  // styleUrls: ['user-investment.css'],
  //service reqs
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
  public emailList: Array<string> = [];
  public amtArry: Array<number> = [];
  private isLoading;
  // public doughnutChartLabels:string[] = this.emailList;
  // public doughnutChartData:number[] = this.amtArry;
  public doughnutChartLabels:Array<string> =[];
  //["Download Sales", 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [];
  
  public doughnutChartType:string = 'doughnut';
  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }
  public chartHovered(e:any):void {
    // console.log(e);
  }

 addUserEmail() {
 	// console.log("inside add user email");
 	// console.log(user);
 	var arrayLength = this.purchases.length;
 	// console.log(arrayLength);
	for (var i = 0; i < arrayLength; i++) {
		// console.log(this.users[i].email);
    	this.doughnutChartLabels.push(this.purchases[i].user);
    	this.doughnutChartData.push(this.purchases[i].amount);
		}
		// console.log("emailList");
		// console.log(this.doughnutChartLabels);
		// console.log("amtArry");
		// console.log(this.doughnutChartData);
}

  getPurchases(): void {
    this.usersService.getPurchases().then(
      purchase => {
        this.purchases = purchase;
        this.addUserEmail();
        this.isLoading = true;
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
        console.log("user in component");
        console.log(user);
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




