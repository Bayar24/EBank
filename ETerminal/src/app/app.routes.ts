import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatementComponent } from './statement/statement.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const MYROUTES: Routes = [
    { path: 'account', component: AccountsComponent },
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'statement', component: StatementComponent },
    { path: 'transaction', component: TransactionComponent,children:[{
        path: 'deposit',component:DepositComponent
    },{
        path:'withdraw',component:WithdrawComponent
    }] },
];

export const myRoutes = RouterModule.forRoot(MYROUTES);

