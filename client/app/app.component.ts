import { Component, OnInit } from '@angular/core';
// import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // template: '<user-form></user-form>'
})
export class AppComponent implements OnInit{
  title = 'Welcome! Plese enter in your info below';

  ngOnInit(): void {
    localStorage.getItem('cd_token') ? console.info('user still logged in') : console.info('not logged in yet');
  }

}
