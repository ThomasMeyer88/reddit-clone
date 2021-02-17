import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import { CustomResponse } from '../models/customResponse';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  connectionErrorResponse: Observable<CustomResponse> = new Observable;

  constructor(private httpClient:HttpClient) {}
  
  public createEmployee(user: User): Observable<CustomResponse> {
      return this.httpClient.post<CustomResponse>("http://localhost:8080/user/create", user);
  }
}
