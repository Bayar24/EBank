import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  private sub: Subscription;
  private customers: any;
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
