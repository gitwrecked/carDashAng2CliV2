import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { RouterModule }          from '@angular/router';
import { ChartsModule }          from 'ng2-charts/ng2-charts';

import { AppComponent }          from './app.component';
import { UsersComponent }        from './users-component/users.component';
import { UserFormComponent }     from './user-form/user-form.component';
import { UserAmountComponent }   from './user-amount/user-amount.component';
import { UsersService }          from './users-service/users.service';
import { LoginComponent }        from './login/login.component';
import { MainNavComponent }      from './main-nav/main-nav.component';
import { AuthGuard }             from './common/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserAmountComponent,
    UsersComponent,
    LoginComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot([
  {
    path: 'userForm',
    component: UserFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'usersamt',
    component: UserAmountComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: UserAmountComponent
  }
])
  ],
  providers: [
    UsersService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
