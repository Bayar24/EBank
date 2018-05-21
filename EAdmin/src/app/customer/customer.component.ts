import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  private sub: Subscription;
  private customers: any[];
  constructor(private data: DataService) { }

  ngOnInit() {
    //this.sub 
    this.customers = this.data.getCustomers();/* .subscribe(
      res => this.accounts = res,
      err => console.log(err)); */
  }
}
