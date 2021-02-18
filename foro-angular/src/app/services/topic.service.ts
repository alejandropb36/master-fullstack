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

    getTopic(topicId: string): Observable<any> {
        const url = this.url + 'topic/' + topicId;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this._httpClient.get(url, {headers});
    }

    getTopics(page: number = 1): Observable<any> {
        const url = this.url + 'topics/' + page;
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

    update(token: string, topic: Topic): Observable<any> {
        const url = this.url + 'topic/' + topic._id;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._httpClient.put(url, topic, {headers});
    }

    delete(token: string, topicId: string): Observable<any> {
        const url = this.url + 'topic/' + topicId;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._httpClient.delete(url, {headers});
    }

    search(searchString: string): Observable<any> {
        const url = this.url + 'search/' + searchString;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this._httpClient.get(url, {headers});
    }
}
