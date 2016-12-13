import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAmountComponent } from './user-amount/user-amount.component';


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserAmountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot([
  {
    path: 'users',
    component: UserFormComponent
  },
    {
    path: 'usersamt',
    component: UserAmountComponent
  }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
