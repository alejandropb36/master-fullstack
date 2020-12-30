import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()

export class UserService {

    private url: string;

    constructor(
        private _httpClient: HttpClient
    ) {
        this.url = global.url;
    }

    prueba(): void {
        console.log('Hola desde el servicio user');
    }

    register(user: User): Observable<any> {
        const url = this.url + 'register';

        const headres = new HttpHeaders().set(
            'Content-Type', 'application/json'
        );

        return this._httpClient.post(url, user, { headers: headres });
    }

    login(user: User, getToken: boolean = false): Observable<any>  {
        // Comprobar si llega el getToken
        if (getToken) {
            user.getToken = getToken;
        }

        const url = this.url + 'login'

        const headres = new HttpHeaders().set(
            'Content-Type', 'application/json'
        );
        
        return this._httpClient.post(url, user, { headers: headres });
    }
}
