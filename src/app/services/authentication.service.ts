import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, ApplicationRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

  constructor(
    private apRef: ApplicationRef,
    private httpClient: HttpClient
  ) { }

  username = 'javainuse';
  password = 'password';

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    console.log(username, password);
    return this.httpClient.get<User>('http://localhost:8080/user/validateLogin',{headers}).toPromise().then(
      (x: User) => {
        if (x != null && x.userName != null) {
          sessionStorage.setItem('username', x.userName);
          return x;
        }
      }
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  getUser() {
    return sessionStorage.getItem('username');
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.apRef.tick();
  }
}