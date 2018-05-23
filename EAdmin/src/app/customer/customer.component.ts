import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CustInfo } from './custinfo';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  private sub: Subscription;
  private customers: any;
  
  displayedColumns = ['cust_no', 'first_name', 'last_name', 'date_of_birth', 'detail', 'accounts'];

  constructor(private data: DataService) { }
  ngOnInit() {

    this.sub = this.data.getCustomers().subscribe(
      res => this.customers = res,
      err => console.log(err));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
