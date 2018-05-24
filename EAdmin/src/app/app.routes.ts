import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustDetailComponent } from './customer/custdetail.component';
import { AccountComponent } from './account/account.component';
import { AcntDetailComponent } from './account/acntdetail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const MYROUTES: Routes = [
    { path: '', redirectTo: 'customer', pathMatch: 'full' },
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
    { path: 'custdetail', component: CustDetailComponent, canActivate: [AuthGuard] },
    { path: 'custdetail/:id', component: CustDetailComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'acntdetail', component: AcntDetailComponent, canActivate: [AuthGuard] },
    { path: 'account/acntdetail/:id', component: AcntDetailComponent, canActivate: [AuthGuard] },
    {
        path: 'transaction', component: TransactionComponent,
        children: [
            { path: 'deposit', component: DepositComponent },
            { path: 'withdraw', component: WithdrawComponent }
        ], canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent }

];

export const myRoutes = RouterModule.forRoot(MYROUTES);

