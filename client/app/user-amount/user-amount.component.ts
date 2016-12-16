import { Component } from '@angular/core';
import { User }    from '../user/user';

// let template = require('./doughnut-chart-demo.html');

@Component({
  // moduleId: module.id,
  selector: 'user-amount',
  templateUrl: 'user-amount.component.html',
  styleUrls: ['user-amount.component.css']

})

export class UserAmountComponent {

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 200];
  public doughnutChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }
}
