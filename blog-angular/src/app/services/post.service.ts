import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { global } from './global';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private url: string;
    private post: Post;

    constructor(
        private httpClient: HttpClient
    ) {
        this.url = global.url;
    }

    create(post: Post, token: string): Observable<any> {
        const url = this.url + 'posts';
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', token);

        return this.httpClient.post(url, post, {headers});
    }

    getPosts(): Observable<any> {
        const url = this.url + 'posts';

        return this.httpClient.get(url);
    }
}