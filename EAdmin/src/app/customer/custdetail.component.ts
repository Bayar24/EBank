import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';


@Component({
  selector: 'app-customer',
  templateUrl: './custdetail.component.html'
})
export class CustDetailComponent implements OnInit {
  private sub: Subscription;
  private customer: any;
  private genders = [
    'Male',
    'Female'
  ];
  constructor(private route: ActivatedRoute, private data: DataService) { }
  ngOnInit() {
    let custid = this.route.snapshot.paramMap.get('id');
    if (custid !== undefined && custid !== null) {
      //this.sub 
      this.customer = this.data.getCustomer(parseInt(custid));/* .subscribe(
      res => this.accounts = res,
      err => console.log(err)); */
    }
    else {
      this.customer = {
        "cust_no": 0,
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "ssn": "",
        "username": "",
        "password": "",
        "date_of_birth": "",
        "contact_phone": 0,
        "email_address": "",
        "sex": "Male",
        "address": { "zip": "", "state": "", "city": "", "street": "", "no": "" }
      };
    }
  }
}
