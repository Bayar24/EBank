import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { CustInfo } from '../customer/custinfo'
import { AcntInfo } from '../account/acctinfo'
import { MatSnackBar } from '@angular/material';
interface Tran {
  cust_no: number,
  name: string;
  acct_no: string;
  acct_name: string;
  accounts: any[];
}
@Component({
  selector: 'app-deposit',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  @ViewChild('custno') private custno: any;
  @ViewChild('amount') private amount: any;
  @ViewChild('description') private description: any;
  private sub: Subscription;
  private tran: any;
  private txn: any;
  private bankAccount = "";
  errMsgAcct = "";
  errMsgCust = "";
  constructor(private data: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.tran = {
      cust_no: undefined,
      name: '',
      accounts: [],
    }
    this.searchBank();
  }
  search() {
    if (this.custno.value) {
      this.sub = this.data.getCustomer(this.custno.value).subscribe(
        res => {
          if (res) {
            this.tran.name = (<CustInfo>res).first_name + " " + (<CustInfo>res).last_name;
            this.errMsgCust = '';
            this.sub = this.data.getCustAccounts(this.custno.value).subscribe(
              result => {
                if (result) {
                  this.openSnackBar('Customer loaded');
                  this.tran.accounts = result;
                  console.log(this.tran.accounts);
                }
                else {
                  this.errMsgAcct = "No account on that customer";
                }
              },
              err => { console.log(err); this.openSnackBar("Error occured, try again!"); }
            );
          }
          else {
            this.tran.name = '';
          }
        },
        err => {
          console.log(err);
          this.openSnackBar("Error occured, try again!");
          this.tran.name = '';
        });
    }
    else
      this.tran.name = '';
  }
  searchBank() {
    this.sub = this.data.getCustAccounts(0).subscribe(
      res => {
        if (res) {
          console.log(res);
          let bankaccts = (<AcntInfo[]>res);
          if (bankaccts.length > 0) {
            this.bankAccount = bankaccts[0].acct_no;
            this.openSnackBar('Selected bank account:' + this.bankAccount);
          }
          else
            this.openSnackBar('Check system configuration');
        }
        else {
          this.openSnackBar('Check system configuration');
        }
      },
      err => console.log(err));
  }
  onChange(val: string) {
    if (val !== "Choose..") {
      this.tran.accounts.forEach(element => {
        if (element.acct_no === parseInt(val)) {
          this.tran.acct_no = val;
          this.tran.acct_name = element.acct_name;
          this.errMsgAcct = '';
        }
      });
    }
    else {
      this.tran.acct_name = '';
    }
  }
  onSubmit() {
    if (this.tran.acct_no) {
      if (this.bankAccount) {
        this.txn = {
          from_acct_no: this.tran.acct_no,
          to_acct_no: this.bankAccount,
          amount: this.amount.value,
          description: this.description.value,
          tran_type: 'D'
        }
        this.sub = this.data.doTransfer(this.txn).subscribe(
          res => {
            console.log(res);
            this.openSnackBar(res['tran_msg']);
          },
          err => console.log(err));
      }
      else
        this.openSnackBar('Check system configuration');
    }
    else {
      if (this.tran.name === '') {
        this.errMsgCust = "Please choose customer";
      }
      else {
        this.errMsgAcct = "Please choose account";
      }
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "OK!", {
      duration: 2000,
    });
  }
}
