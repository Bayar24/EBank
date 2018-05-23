import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
  templateUrl: './acntdetail.component.html'
})
export class AcntDetailComponent implements OnInit {
  @ViewChild('acctname') private acctname: any;
  @ViewChild('amount') private amount: any;
  private sub: Subscription;
  private acnt: any;
  private acct_no: any;
  private acct_name: any;
  private amnt: any;
  private custid: number = 0;
  private bank_account: boolean = false;
  constructor(private route: ActivatedRoute, private data: DataService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.custid = parseInt(id);
    else
      this.bank_account = true;
  }
  onSubmit() {
    if (this.acct_no && this.acct_name) {
      this.acnt = {
        acct_no: this.acct_no,
        cust_no: this.custid,
        acct_name: this.acctname.value,
        current_bal: this.amount.value,
        begin_bal: this.amount.value,
        bank_account: this.bank_account,
        status: 'Open'
      }
      this.sub = this.data.createAccount(this.acnt).subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err));
    }
  }
  generate() {
    this.acct_no = 40000000 + Math.floor(Math.random() * (999999 - 100000 + 1));
  }
}
