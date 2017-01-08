import {Component, OnInit} from '@angular/core';
import {AppComponentAnimations} from './app.component.animations';

const template = require('./app.component.html');
const styles   = require('./app.component.css');

@Component({
  selector: 'app-root',
  styleUrls: [styles],
  templateUrl: template,
  animations: AppComponentAnimations
})
export class AppComponent implements OnInit {
  page: string = 'loading';

  ngOnInit(): void {
    setTimeout(() => {
      this.page = 'loaded';
    }, 500);
  }
}
