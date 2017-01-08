import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routes';
import {AuthGuard} from './common/auth.guard';
import {SessionService} from './common/session.service';
import {LoginComponent} from './login/login.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserInvestmentComponent} from './user-investment/user-investment.component';
import {UsersService} from './users-service/users.service';

@NgModule({
  declarations: [
    AppComponent, UserFormComponent, PurchaseHistoryComponent,
    UserInvestmentComponent, LoginComponent, MainNavComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, ChartsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [UsersService, AuthGuard, SessionService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
