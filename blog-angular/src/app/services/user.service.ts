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
    public identity: any;
    public token: string;
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

    singup(user, getToken = null): Observable<any> {
        const url = `${this.url}login`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        if (getToken) {
            user.getToken = true;
        }

        return this.httpClient.post(url, user, {headers});
    }

    update(token: string, user: User): Observable<any> {
        const url = `${this.url}users/update`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this.httpClient.put(url, user, {headers});
    }

    gteIdentity(): any {
        const identity = JSON.parse(localStorage.getItem('identity'));
        if (identity) {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken(): string {
        const token = localStorage.getItem('token');
        if (token) {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }
}

