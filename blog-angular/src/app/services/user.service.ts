import { Injectable, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class UserService {
    constructor(
        private httpClient: HttpClient
    ) {}

    
}

