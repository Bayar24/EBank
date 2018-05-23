import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private sub: Subscription;
  private accounts: any;
  private custid: string;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.custid = this.route.snapshot.paramMap.get('id');
    if (this.custid !== undefined && this.custid !== null) {
      this.sub  = this.data.getCustAccounts(parseInt(this.custid)).subscribe(
      res => this.accounts = res,
      err => console.log(err)); 
    }
  }
}
