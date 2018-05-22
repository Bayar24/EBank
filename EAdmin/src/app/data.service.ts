import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class DataService {

  constructor(public http: HttpClient) { }
  getCustomers() {
    let custs: any[];
    custs = [
      {
        "cust_no": 123124123,
        "first_name": "Khosbayar",
        "middle_name": "",
        "last_name": "Buyandalai",
        "ssn": "123-123-123",
        "username": "hs",
        "password": "password",
        "date_of_birth": "1993-03-04",
        "contact_phone": 311212312,
        "email_address": "hs.khosbayar@gmail.com",
        "sex": true,
        "address": { "zip": "52556", "state": "IA", "city": "Fairfield", "street": "2000N Court", "no": "16C" }
      },
      {
        "cust_no": 22222,
        "first_name": "Khosbayar1",
        "middle_name": "",
        "last_name": "Buyandalai",
        "ssn": "123-123-123",
        "username": "hs",
        "password": "password",
        "date_of_birth": "1993-03-04",
        "contact_phone": 311212312,
        "email_address": "hs.khosbayar@gmail.com",
        "sex": true,
        "address": { "zip": "52556", "state": "IA", "city": "Fairfield", "street": "2000N Court", "no": "16C" }
      },
      {
        "cust_no": 111111,
        "first_name": "Khosbayar2",
        "middle_name": "",
        "last_name": "Buyandalai",
        "ssn": "123-123-123",
        "username": "hs",
        "password": "password",
        "date_of_birth": "1993-03-04",
        "contact_phone": 311212312,
        "email_address": "hs.khosbayar@gmail.com",
        "sex": true,
        "address": { "zip": "52556", "state": "IA", "city": "Fairfield", "street": "2000N Court", "no": "16C" }
      }];
    return custs;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
  }
  getCustomer(id: number) {
    let custs: any[];
    custs = [
      {
        "cust_no": 123124123,
        "first_name": "Khosbayar",
        "middle_name": "",
        "last_name": "Buyandalai",
        "ssn": "123-123-123",
        "username": "hs",
        "password": "password",
        "date_of_birth": "1993-03-04",
        "contact_phone": 311212312,
        "email_address": "hs.khosbayar@gmail.com",
        "sex": "Male",
        "address": { "zip": "52556", "state": "IA", "city": "Fairfield", "street": "2000N Court", "no": "16C" }
      },
      {
        "cust_no": 22222,
        "first_name": "Khosbayar1",
        "middle_name": "",
        "last_name": "Buyandalai",
        "ssn": "123-123-123",
        "username": "hs",
        "password": "password",
        "date_of_birth": "1993-03-04",
        "contact_phone": 311212312,
        "email_address": "hs.khosbayar@gmail.com",
        "sex": "Female",
        "address": { "zip": "52556", "state": "IA", "city": "Fairfield", "street": "2000N Court", "no": "16C" }
      },
      {
        "cust_no": 111111,
        "first_name": "Khosbayar2",
        "middle_name": "",
        "last_name": "Buyandalai",
        "ssn": "123-123-123",
        "username": "hs",
        "password": "password",
        "date_of_birth": "1993-03-04",
        "contact_phone": 311212312,
        "email_address": "hs.khosbayar@gmail.com",
        "sex": "Male",
        "address": { "zip": "52556", "state": "IA", "city": "Fairfield", "street": "2000N Court", "no": "16C" }
      }];
    for (let i = 0; i < custs.length; i++) {
      if (custs[i].cust_no === id) {
        return custs[i];
      }
    }
    return null;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
  }
  getAccounts() {
    let accts: any[];
    accts = [{ id: '4112334', currentbal: '12345', opendate: '12/02/2018' }];
    return accts;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
  }
  getAccount() {
    let accts: any[];
    accts = [{ id: '4112334', currentbal: '12345', opendate: '12/02/2018' }];
    return accts;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
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
