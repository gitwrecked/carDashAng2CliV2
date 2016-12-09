import { Component } from '@angular/core';
import { User }    from '../user/user';
@Component({
  // moduleId: module.id,
  selector: 'user-form',
  templateUrl: 'user-form.component.html'
})



export class UserFormComponent {
  title ='Enter User Amount Spending';
  model = new User(18, 'Dr IQ', 20, 'test desc');
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
    active = true;
  newUser() {
    this.model = new User(42, '', 0,'test desc');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
  get diagnostic() { return JSON.stringify(this.model); }
}
