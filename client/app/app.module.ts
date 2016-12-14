import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { UsersComponent }          from './users-component/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAmountComponent } from './user-amount/user-amount.component';
import { UsersService }          from './users-service/users.service';


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserAmountComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot([
  {
    path: 'userForm',
    component: UserFormComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
    {
    path: 'usersamt',
    component: UserAmountComponent
  }
])
  ],
  providers: [
  UsersService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
