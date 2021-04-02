import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  register(user: User): Observable<any> {
    const url: string = this.apiUrl + 'register';
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.post(url, user, {headers});
  }
}
