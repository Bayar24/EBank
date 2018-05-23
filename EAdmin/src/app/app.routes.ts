import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustDetailComponent } from './customer/custdetail.component';
import { AccountComponent } from './account/account.component';
import { AcntDetailComponent } from './account/acntdetail.component';

const MYROUTES: Routes = [
    { path: '', redirectTo: 'customer', pathMatch: 'full' },
    { path: 'customer', component: CustomerComponent },
    { path: 'custdetail', component: CustDetailComponent },
    { path: 'custdetail/:id', component: CustDetailComponent },
    { path: 'account/:id', component: AccountComponent },
    { path: 'account/acntdetail/:id', component: AcntDetailComponent }
];

export const myRoutes = RouterModule.forRoot(MYROUTES);

