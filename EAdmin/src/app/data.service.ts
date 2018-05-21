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
    custs = [{ id: '4112331', firstname: 'John', lastname: 'Wick', birthdate: '12/02/2018' },
    { id: '4112332', firstname: 'John1', lastname: 'Wick1', birthdate: '12/02/2018' },
    { id: '4112333', firstname: 'John2', lastname: 'Wick2', birthdate: '12/02/2018' },];
    return custs;//this.http.get(`http://localhost:3000/api/recent/transaction/`);
  }
  getCustomer(id: string) {
    let custs: any[];
    custs = [{ id: '4112334', firstname: 'John', lastname: 'Wick', birthdate: '12/02/2018' },
    { id: '4112334', firstname: 'John1', lastname: 'Wick1', birthdate: '12/02/2018' },
    { id: '4112334', firstname: 'John2', lastname: 'Wick2', birthdate: '12/02/2018' },];
    for (let i = 0; i < custs.length; i++) {
      if (custs[i].id = id)
        return custs[i];
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
