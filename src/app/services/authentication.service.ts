import { Injectable, ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private apRef: ApplicationRef
  ) { }

  authenticate(username, password) {
    if (username === "javainuse" && password === "password") {
      sessionStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
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