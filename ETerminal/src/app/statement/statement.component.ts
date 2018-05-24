import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  displayedColumns = ['_id', 'tran_date', 'tran_type', 'from_acct_no', 'to_acct_no', 'amount', 'description'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild('f') myForm;
  private sub: Subscription;
  private transactions: any[];
  accounts;
  acct_no;
  errMsgAcct;
  constructor(private data: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.acct_no = params['acct_no'];
    });
    this.loadAccounts();
  }

  loadAccounts() {
    this.sub = this.data.getAccounts().subscribe(
      res => this.accounts = res,
      err => console.log(err)
    );
  }

  onSubmit(form) {
    if (form.valid) {
      this.sub = this.data.getTransactions(form.value).subscribe(
        (res) => { this.dataSource = new MatTableDataSource(<StatementElement[]>res); },
        (err) => console.log(err)
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

export interface StatementElement {
  _id: number;
  tran_date: Date;
  tran_type: string;
  from_acct_no: number;
  to_acct_no: number;
  amount: number;
  description: string;
}

const ELEMENT_DATA: StatementElement[] = [];
