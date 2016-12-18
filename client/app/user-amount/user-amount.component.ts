import { Component } from '@angular/core';
import { User }    from '../user/user';
// let template = require('./doughnut-chart-demo.html');

const USERS: User[] = [
  { id: 11, name: 'Mr. Nice' , amount:100, description: 'test desc'},
  { id: 12, name: 'Narco' , amount:400, description: 'test desc'},
  { id: 13, name: 'Bombasto' , amount:900, description: 'test desc'}
  // { id: 14, name: 'Celeritas' },
  // { id: 15, name: 'Magneta' },
  // { id: 16, name: 'RubberMan' },
  // { id: 17, name: 'Dynama' },
  // { id: 18, name: 'Dr IQ' },
  // { id: 19, name: 'Magma' },
  // { id: 20, name: 'Tornado' }
];

@Component({
  // moduleId: module.id,
  selector: 'user-amount',
  templateUrl: 'user-amount.component.html',
  styleUrls: ['user-amount.component.css']

})



export class UserAmountComponent{
  users = USERS;
  title = 'User Account Info';
  selectedUser: User;

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 200];
  public doughnutChartType:string = 'pie';

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }
}
