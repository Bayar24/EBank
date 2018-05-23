import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  displayedColumns = ['acct_no','acct_name','acct_status','current_bal','acct_type'];
  dataSource:PeriodicElement;

  private sub: Subscription;
  // private accounts;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.sub = this.data.getAccounts().subscribe(
      res => { this.dataSource = <PeriodicElement>res; },
      err => console.log(err));
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
export interface PeriodicElement {
  acct_no: number;
  acct_name: string;
  acct_status: string;
  current_bal: number;
  acct_type: string;
}