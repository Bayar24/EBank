import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getTransactions(data) {
    // const body = JSON.stringify(data);
    let params = new HttpParams().set('acct_no', data.acct_no);
    params = params.set('from_date', data.from_date);
    params = params.set('to_date', data.to_date);
    return this.http.get(`${base_url}/tran`, {
      params: params,
      headers: this.authService.buildHeaders()
    });
  }
  getUserInfo() {
    return this.http.get('http://localhost:3000/api/home');
  }
  getCustomer(id: number) {
    return this.http.get(`http://localhost:3000/cust/${id}`, {
      headers: this.authService.buildHeaders()
    });
  }
  updateCustomer(custinfo: any) {
    const body = JSON.stringify(custinfo);
    let id = custinfo.cust_no;
    return this.http.put(`http://localhost:3000/cust/${id}`, body, {
      headers: this.authService.buildHeaders()
    });
  }
}
