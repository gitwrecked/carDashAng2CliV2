import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { RouterModule }          from '@angular/router';
import { ChartsModule }          from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import {PurchaseHistoryComponent} from './purchase-history-component/purchase.history.component';
import {UserInvestmentComponent} from './user-investment-component/user-investment.component';
// import { UsersComponent }          from './users-component/users.component';
import { UserFormComponent } from './user-form/user-form.component';
// import { UserAmountComponent } from './user-amount/user-amount.component';
import { UsersService }          from './users-service/users.service';
import { LoginComponent }        from './login/login.component';
import { MainNavComponent }      from './main-nav/main-nav.component';
import { AuthGuard }             from './common/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    PurchaseHistoryComponent,
    UserInvestmentComponent,
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
    path: 'purchaseHistory',
    component: PurchaseHistoryComponent
  },
     {
    path: 'usersInvestments',
    component: UserInvestmentComponent
  },
  {
    path: '**',
    component: PurchaseHistoryComponent
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
