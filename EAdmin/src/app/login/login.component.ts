import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: any;

  username = '';
  password = '';
  loggedIn;

  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  onSubmit() {
    if (this.form.valid){
      this.authService.login(this.username, this.password)
    }
  }

  ngOnInit() {
  }

}
