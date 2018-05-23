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
    console.log(body);
    let id = custinfo.cust_no;
    return this.http.put(`http://localhost:3000/cust/${id}`, body, httpOptions);
  }
  getCustAccounts(id: number) {
    return this.http.get(`http://localhost:3000/cust/${id}/acct`);
  }
  getAccount(id: string) {
    return this.http.get(`http://localhost:3000/acct/${id}`);
  }
  getTransactions() {
    let trans: any[];
    trans = [{ amount: '100', begbal: '12345', endbal: '12445', trandate: '12/02/2018' }];
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
