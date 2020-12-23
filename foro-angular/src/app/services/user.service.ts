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
}
