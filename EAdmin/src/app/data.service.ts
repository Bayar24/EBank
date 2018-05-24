import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const base_url = "http://localhost:3000";

@Injectable()
export class DataService {
  currentUser;

  constructor(public http: HttpClient, private authService: AuthService) { }
  getCustomers() {
    return this.http.get(`http://localhost:3000/cust`, {
      headers: this.authService.buildHeaders()
    });
  }
  getCustomer(id: number) {
    return this.http.get(`http://localhost:3000/cust/${id}`, {
      headers: this.authService.buildHeaders()
    });
  }
  insertCustomer(custinfo: object) {
    const body = JSON.stringify(custinfo);
    console.log(body);
    return this.http.post(`http://localhost:3000/cust/`, body, {
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
  getAllAccounts() {
    return this.http.get(`http://localhost:3000/acct`, {
      headers: this.authService.buildHeaders()
    });
  }
  getCustAccounts(id: number) {
    return this.http.get(`http://localhost:3000/cust/${id}/acct`, {
      headers: this.authService.buildHeaders()
    });
  }
  getAccount(id: string) {
    return this.http.get(`http://localhost:3000/acct/${id}`, {
      headers: this.authService.buildHeaders()
    });
  }
  createAccount(acnt: string) {
    const body = JSON.stringify(acnt);
    console.log(body);
    return this.http.post(`http://localhost:3000/acct/`, body, {
      headers: this.authService.buildHeaders()
    });
  }
  doTransfer(txn: any) {
    const body = JSON.stringify(txn);
    console.log(body);
    return this.http.post(`http://localhost:3000/tran/`, body, {
      headers: this.authService.buildHeaders()
    });
  }
}
