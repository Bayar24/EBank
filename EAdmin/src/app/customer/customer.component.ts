import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material';
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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  dataSource = new MatTableDataSource(this.customers);
  constructor(private data: DataService) { }
  ngOnInit() {

    this.sub = this.data.getCustomers().subscribe(
      res => { this.customers = res; this.dataSource = new MatTableDataSource(this.customers); },
      err => console.log(err));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
