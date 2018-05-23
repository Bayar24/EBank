import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class DataService {
  currentUser;
  constructor(public http: HttpClient,private authService: AuthService) { }
  getAccounts() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.dir(`http://localhost:3000/cust/${this.currentUser.cust_no}/acct`);
    return this.http.get(`http://localhost:3000/cust/${this.currentUser.cust_no}/acct`,{
      headers: this.authService.buildHeaders()
    });
  }
  getTransactions() {
    let trans: any[];
    trans = [{amount:'100', begbal:'12345', endbal:'12445', trandate:'12/02/2018'}];
    return trans;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
  }
  getUserInfo() {
    return this.http.get('http://localhost:3000/api/home');
  }
  makePayment(payment: object) {
    const body = JSON.stringify(payment);
    console.log(body);
    return this.http.post('http://localhost:3000/api/makepayment', body, httpOptions);
  }

}
