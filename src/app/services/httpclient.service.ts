import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import { CustomResponse } from '../models/customResponse';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) {}

  headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('javainuse' + ':' + 'password') });

  public createEmployee(user: User) {
    const h = this.headers;
    return this.httpClient.post<CustomResponse>("http://localhost:8080/user/create", user);
  }
}
