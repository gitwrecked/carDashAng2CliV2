import { Component, OnInit } from '@angular/core';

const template = require('./app.component.html');
const styles   = require('./app.component.scss');

@Component({
  selector: 'app-root',
  templateUrl: template,
  styleUrls: [styles]  
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    
  }	

}
