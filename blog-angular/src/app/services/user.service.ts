import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { global } from './global';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string;
    constructor(
        private httpClient: HttpClient
    ) {
        this.url = global.url;
    }

    register(user: User): Observable<any> {
        const url = `${this.url}register`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(url, user, {headers});
    }
}

