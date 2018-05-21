import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  private sub: Subscription;
  private accounts: any[];
  constructor(private data: DataService) { }

  ngOnInit() {
    //this.sub 
    this.accounts = this.data.getAccounts();/* .subscribe(
      res => this.accounts = res,
      err => console.log(err)); */
  }

}
