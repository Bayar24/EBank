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
 
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    let custid = this.route.snapshot.paramMap.get('id');
    //this.sub 
    this.customer = this.data.getCustomer(custid);/* .subscribe(
      res => this.accounts = res,
      err => console.log(err)); */
  }
}
