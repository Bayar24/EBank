import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  displayedColumns = ['acct_no', 'acct_name', 'acct_status', 'current_bal', 'acct_type', 'statement'];
  dataSource: AccountElement;

  private sub: Subscription;
  // private accounts;
  constructor(private data: DataService, private router: Router) { }

  navigateStatement(acct_no) {
    // console.log(acct_no);
    this.router.navigate(['/statement'], { queryParams: { acct_no: acct_no } });
  }

  ngOnInit() {
    this.sub = this.data.getAccounts().subscribe(
      res => { this.dataSource = <AccountElement>res; },
      err => console.log(err));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
export interface AccountElement {
  acct_no: number;
  acct_name: string;
  acct_status: string;
  current_bal: number;
  acct_type: string;
  statement: string;
}