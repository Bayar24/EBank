import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { CustInfo } from '../customer/custinfo'
import { AcntInfo } from '../account/acctinfo'
interface Tran {
  cust_no: number,
  name: string;
  acct_no: string;
  acct_name: string;
  acct_no2: string;
  acct_name2: string;
  accounts: any[];
}
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  @ViewChild('custno') private custno: any;
  @ViewChild('acctno2') private acctno2: any;
  @ViewChild('amount') private amount: any;
  @ViewChild('description') private description: any;
  private sub: Subscription;
  private tran: any;
  private txn: any;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.tran = {
      cust_no: undefined,
      name: '',
      accounts: [],
    }
  }
  search() {
    if (this.custno.value) {
      this.sub = this.data.getCustomer(this.custno.value).subscribe(
        res => {
          this.tran.name = (<CustInfo>res).first_name + " " + (<CustInfo>res).last_name;
          this.sub = this.data.getCustAccounts(this.custno.value).subscribe(
            result => { this.tran.accounts = result; console.log(this.tran.accounts) },
            err => console.log(err)
          );
        },
        err => console.log(err));
    }
  }
  searchReceiver() {
    if (this.acctno2.value) {
      this.tran.acct_no2 = this.acctno2.value;
      this.sub = this.data.getAccount(this.acctno2.value).subscribe(
        res => {
          if (res) {
            this.tran.acct_name2 = (<AcntInfo>res).acct_name;
          }
          else{
            this.tran.acct_name2 = "";
          }
        },
        err => console.log(err));
    }
  }
  onChange(val: string) {
    if (val !== "Choose..") {
      this.tran.acct_no = val;
      this.tran.accounts.forEach(element => {
        if (element.acct_no === parseInt(val)) {
          this.tran.acct_name = element.acct_name;
        }
      });
    }
  }
  onSubmit(){
    this.txn = {
      from_acct_no: this.tran.acct_no,
      to_acct_no: this.acctno2.value,
      amount: this.amount.value,
      description: this.description.value,
      tran_type: 'D'
    }
    this.sub = this.data.doTransfer(this.txn).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err));
  }
}
