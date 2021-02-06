import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { global } from './global';

@Injectable()

export class TopicService {
    private url: string;

    constructor(
        private _httpClient: HttpClient
    ) {
        this.url = global.url;
    }

    prueba(): void {
        console.log('Hola mundo desde el servicio de topic');
    }

    addTopic(token: string, topic: Topic): Observable<any> {
        const url = this.url + 'topic';
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._httpClient.post(url, topic, {headers});
    }
}