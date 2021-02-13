import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url: string;

    constructor(
        private httpClient: HttpClient
    ) {
        this.url = global.url;
    }

    add(token: string, comment: Comment, topicId: string): Observable<any> {
      const url = this.url + 'comment/topic/' + topicId;
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token);

      return this.httpClient.post(url, comment, {headers});
    }

    delete(token: string, topicId: string, commentId: string): Observable<any> {
      const url = this.url + 'comment/' + topicId + '/' + commentId;
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token);

      return this.httpClient.delete(url, {headers});
    }
}
