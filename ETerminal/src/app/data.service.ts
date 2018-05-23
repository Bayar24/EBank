import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const base_url = "http://localhost:3000";

@Injectable()
export class DataService {
  currentUser;
  constructor(public http: HttpClient, private authService: AuthService) { }
  getAccounts() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`${base_url}/cust/${this.currentUser.cust_no}/acct`, {
      headers: this.authService.buildHeaders()
    });
  }

  getAccountDetails(acct_no: number) {
    return this.http.get(`${base_url}/acct/${acct_no}`, {
      headers: this.authService.buildHeaders()
    });
  }
  makeTransfer(data: object) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(`${base_url}/tran`, body, {
      headers: this.authService.buildHeaders()
    });
  }

  getTransactions() {
    let trans: any[];
    trans = [{ amount: '100', begbal: '12345', endbal: '12445', trandate: '12/02/2018' }];
    return trans;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
  }
  getUserInfo() {
    return this.http.get('http://localhost:3000/api/home');
  }

}
