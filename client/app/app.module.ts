import { BrowserModule }             from '@angular/platform-browser';
import { NgModule }                  from '@angular/core';
import { FormsModule }               from '@angular/forms';
import { HttpModule }                from '@angular/http';
import { RouterModule }              from '@angular/router';
import { ChartsModule }              from 'ng2-charts/ng2-charts';

import { AppComponent }              from './app.component';
import { PurchaseHistoryComponent }  from './purchase-history/purchase-history.component';
import { UserInvestmentComponent }   from './user-investment/user-investment.component';
import { UserFormComponent }         from './user-form/user-form.component';
import { UsersService }              from './users-service/users.service';
import { LoginComponent }            from './login/login.component';
import { MainNavComponent }          from './main-nav/main-nav.component';
import { AuthGuard }                 from './common/auth.guard';
import { SessionService }            from './common/session.service';

import { AppRoutes }                 from './app.routes';

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
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    UsersService,
    AuthGuard,
    SessionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
