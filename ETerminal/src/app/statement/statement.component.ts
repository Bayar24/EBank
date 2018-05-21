import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  private sub: Subscription;
  private transactions: any[];
  constructor(private data: DataService) { }

  ngOnInit() {
    //this.sub 
    this.transactions = this.data.getTransactions();/* .subscribe(
      res => this.accounts = res,
      err => console.log(err)); */
  }

}
