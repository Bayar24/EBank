import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'acntdetail',
  templateUrl: './acntdetail.component.html'
})
export class AcntDetailComponent implements OnInit {
  @ViewChild('f') private custForm: any;
  private sub: Subscription;
  private account: any;
  private isNew: boolean = false;
  private genders = [
    'Male',
    'Female'
  ];
  constructor(private route: ActivatedRoute, private data: DataService) { }
  ngOnInit() {
    this.load();
  }
  load() {
    this.account = {
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
  }
  onSubmit() {
    if (this.isNew) {
      this.sub = this.data.insertCustomer(this.custForm.value).subscribe(
        res => console.log(res),
        err => console.log(err));
        this.isNew = false;
    }
    else{
      this.sub = this.data.updateCustomer(this.custForm.value).subscribe(
        res => console.log(res),
        err => console.log(err));
    }
  }
}

