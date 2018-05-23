import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = 'http://localhost:3000';
  loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn: boolean = false;
  token;
  user;

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  buildHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.getToken()) {
      headersConfig['Authorization'] = `Token ${this.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  login(username: string, password: string) {
    this.http.post(this.api + '/login', {
      username: username,
      password: password
    }).subscribe((resp: any) => {
      this.loggedIn.next(true);
      this.saveToken(resp.token);
      this.user = resp.user;
      this.isLoggedIn = true;
      localStorage.setItem('currentUser', this.user);
      this.router.navigate(['/']);
      location.reload();
    }, (errorResp) => {
      this.loggedIn.next(undefined);
      errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
    });
  }

  logout() {
    this.destroyToken();
    this.isLoggedIn = false;
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
  }


  constructor(private http: HttpClient,
    private toastr: ToastrService, private router: Router) { }
}
