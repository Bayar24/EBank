import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material';

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
  errMsgAcct;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.loadAccounts();
    // //this.sub 
    // this.transactions = this.data.getTransactions();/* .subscribe(
    //   res => this.accounts = res,
    //   err => console.log(err)); */
  }

  loadAccounts() {
    this.sub = this.data.getAccounts().subscribe(
      res => this.accounts = res,
      err => console.log(err)
    );
  }

  onSubmit(form) {
    if (form.valid) {
      console.log(form.value);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
