import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CustomResponse } from '../models/customResponse';
import { Observable } from 'rxjs';

const api = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  connectionErrorResponse: Observable<CustomResponse> = new Observable;

  constructor(private httpClient:HttpClient) {}
  
  public createUser(user: User): Observable<CustomResponse> {
      return this.httpClient.post<CustomResponse>(`${api}/user/create`, user);
  }

  public createComment(comment: Comment): Observable<CustomResponse> {
    return this.httpClient.post<CustomResponse>(`${api}/comment/create`, comment);
  }
}
