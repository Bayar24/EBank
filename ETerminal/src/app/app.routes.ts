import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatementComponent } from './statement/statement.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CustDetailComponent } from './customer/custdetail.component';
import { AuthGuard } from './auth.guard';

const MYROUTES: Routes = [
    { path: 'account', component: AccountsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'statement', component: StatementComponent, canActivate: [AuthGuard] },
    { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard]},
    { path: 'custdetail/:id', component: CustDetailComponent, canActivate: [AuthGuard]}
];

export const myRoutes = RouterModule.forRoot(MYROUTES);

