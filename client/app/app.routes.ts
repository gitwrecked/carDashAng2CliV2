import {AuthGuard} from './common/auth.guard';
import {LoginComponent} from './login/login.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserInvestmentComponent} from './user-investment/user-investment.component';

export const AppRoutes: any = [
  {path: 'userForm', component: UserFormComponent, canActivate: [AuthGuard]},
  {path: 'purchaseHistory', component: PurchaseHistoryComponent},
  {path: 'usersInvestments', component: UserInvestmentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: UserInvestmentComponent},
  {path: '**', component: UserInvestmentComponent},
];
