import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  accounts;
  from_acct_no:number;
  errMsgRecAcct;
  errMsgAcct;
  selectedAcct = "";
  receiver: { acct_no: string, acct_name: string } = {
    acct_no: "",
    acct_name: ""
  };
  amount;
  description;
  tran_type="t";
  hasReceiver = false;
  acctChoosen = false;
  private sub: Subscription;

  @ViewChild('f') myForm;

  constructor(private data: DataService,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.sub = this.data.getAccounts().subscribe(
      res => this.accounts = res,
      err => console.log(err)
    );
  }

  searchReceiverAccount() {
    if (this.receiver.acct_no != "") {
      this.sub = this.data.getAccountDetails(Number.parseInt(this.receiver.acct_no)).subscribe(
        res => {
          if (res) {
            this.receiver = <{ acct_no: string, acct_name: string }>res;
            if (this.receiver.acct_name) {
              console.log("Found!" + this.receiver.acct_name);
              this.openSnackBar("Account found!");
              this.errMsgRecAcct = "";
              this.hasReceiver = true;
            } else {
              this.hasReceiver = false;
              // this.openSnackBar("Account not found!");
              this.errMsgRecAcct = "Account not found!";
              this.receiver.acct_name = "";
            }
          } else {
            this.hasReceiver = false;
            // this.openSnackBar("Account not found!");
            this.errMsgRecAcct = "Account not found!";
            this.receiver.acct_name = "";
          }
        },
        err => console.log(err)
      );
    } else {
      this.errMsgRecAcct = "Please insert receiver's account number";
      this.receiver.acct_name = "";
    }
  }

  onChangeAccount(val:number) {
    
    let found = false;
    for (let acc of this.accounts) {
      if (acc.acct_no == val) {
        found = true;
        this.selectedAcct = acc.acct_name;
        this.errMsgAcct = "";
        this.acctChoosen = true;
        this.openSnackBar("Account choosen!");
      }
    }
    if (!found) {
      this.acctChoosen = false;
      this.errMsgAcct = "Please choose your account number";
      this.selectedAcct = 'Choose your account number';
    }
  }

  onSubmit(form) {
    if (this.hasReceiver) {
      if (this.acctChoosen) {
        console.dir(form.value);
        this.sub = this.data.makeTransfer(form.value).subscribe(
          (res) => {
            this.openSnackBar(res['tran_msg']);
            console.dir();
          },
          (err) => {console.log(err); this.openSnackBar("Error occured, try again!"); }
        );
      } else {
        this.errMsgAcct = "Choose your account!";
      }
    } else {
      this.errMsgRecAcct = "Please insert receiver's account number";
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK!" , {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}