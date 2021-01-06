import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) {}

  public createEmployee(user: User) {
    return this.httpClient.post<User>("http://localhost:8080/user/create", user);
  }
}
