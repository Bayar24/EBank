import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { AccountComponent } from './account/account.component';

const MYROUTES: Routes = [
    { path: '', redirectTo: 'customer', pathMatch: 'full' },
    { path: 'customer', component: CustomerComponent },
    { path: 'accounts', component: AccountComponent },
];

export const myRoutes = RouterModule.forRoot(MYROUTES);

