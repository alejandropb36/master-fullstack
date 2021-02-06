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

    getTopics(page: number): Observable<any> {
        const url = this.url + 'topics/' + page && page > 0 ? page.toString() : '';
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this._httpClient.get(url, {headers});
    }

    getTopicsByUser(userId: string): Observable<any> {
        const url = this.url + 'user-topics/' + userId;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this._httpClient.get(url, {headers});
    }
}