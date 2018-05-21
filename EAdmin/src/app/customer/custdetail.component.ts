import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './custdetail.component.html'
})
export class CustDetailComponent implements OnInit {
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
