import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()

export class UserService {
    constructor(
        private _httpClient: HttpClient
    ) {}

    prueba(): void {
        console.log('Hola desde el servicio user');
    }
}
