import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CustInfo } from './custinfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './custdetail.component.html',
  styles: ['.legend {display: block;padding-left: 2px;padding-right: 2px;border: none;}']
})
export class CustDetailComponent implements OnInit {
  @ViewChild('f') private custForm: any;
  @ViewChild('pCustNo') private custno: any;
  private sub: Subscription;
  private customer: CustInfo;
  private isNew: boolean = false;
  private genders = [
    'Male',
    'Female'
  ];
  constructor(private route: ActivatedRoute, private router: Router, private data: DataService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.load();
  }
  load() {
    this.customer = {
      cust_no: undefined,
      first_name: '',
      middle_name: '',
      last_name: '',
      ssn: '',
      username: '',
      password: '',
      date_of_birth: '',
      contact_phone: undefined,
      email_address: '',
      sex: 'Male',
      address: {
        zip: '',
        state: '',
        city: '',
        street: '',
        no: ''
      }
    };
    let custid = this.route.snapshot.paramMap.get('id');
    if (custid !== undefined && custid !== null) {
      this.isNew = false;
      this.sub = this.data.getCustomer(parseInt(custid)).subscribe(
        res => this.customer = res as CustInfo,
        err => console.log(err));
    }
    else {
      this.isNew = true;
    }
  }
  onSubmit() {
    this.sub = this.data.updateCustomer(this.custForm.value).subscribe(
      res => { console.log(res); this.openSnackBar('Customer updated.'); },
      err => { console.log('err'); console.log(err); });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK!", {
      duration: 2000,
    });
  }
}

