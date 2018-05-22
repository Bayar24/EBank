import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustDetailComponent } from './customer/custdetail.component';
import { AccountComponent } from './account/account.component';

const MYROUTES: Routes = [
    { path: '', redirectTo: 'customer', pathMatch: 'full' },
    { path: 'customer', component: CustomerComponent },
    { path: 'custdetail/:id', component: CustDetailComponent },
    { path: 'accounts/:id', component: AccountComponent },
];

export const myRoutes = RouterModule.forRoot(MYROUTES);

