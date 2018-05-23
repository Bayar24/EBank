import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  constructor(public http: HttpClient) { }
  getCustomers() {
    return this.http.get(`http://localhost:3000/cust`);
  }
  getCustomer(id: number) {
    return this.http.get(`http://localhost:3000/cust/${id}`);
  }
  insertCustomer(custinfo: object) {
    const body = JSON.stringify(custinfo);
    console.log(body);
    return this.http.post(`http://localhost:3000/cust/`, body, httpOptions);
  }
  updateCustomer(custinfo: any) {
    const body = JSON.stringify(custinfo);
    let id = custinfo.cust_no;
    return this.http.put(`http://localhost:3000/cust/${id}`, body, httpOptions);
  }
  getAllAccounts() {
    return this.http.get(`http://localhost:3000/acct`);
  }
  getCustAccounts(id: number) {
    return this.http.get(`http://localhost:3000/cust/${id}/acct`);
  }
  getAccount(id: string) {
    return this.http.get(`http://localhost:3000/acct/${id}`);
  }
  createAccount(acnt: string) {
    const body = JSON.stringify(acnt);
    console.log(body);
    return this.http.post(`http://localhost:3000/acct/`, body, httpOptions);
  }
  doTransfer(txn: any) {
    const body = JSON.stringify(txn);
    console.log(body);
    return this.http.post(`http://localhost:3000/tran/`, body, httpOptions);
  }
}
