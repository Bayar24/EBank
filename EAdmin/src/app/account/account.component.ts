import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
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
  displayedColumns = ['acct_no', 'cust_no', 'acct_name', 'current_bal', 'acct_status', 'bank_account'];
  dataSource = new MatTableDataSource(this.accounts);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.custid = this.route.snapshot.paramMap.get('id');
    if (this.custid !== undefined && this.custid !== null) {
      this.sub = this.data.getCustAccounts(parseInt(this.custid)).subscribe(
        res => { this.accounts = res; this.dataSource = new MatTableDataSource(this.accounts); console.log(res) },
        err => console.log(err));
    }
    else {
      this.sub = this.data.getAllAccounts().subscribe(
        res => { this.accounts = res; this.dataSource = new MatTableDataSource(this.accounts); console.log(res) },
        err => console.log(err));
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
