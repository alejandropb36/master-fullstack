import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  create(video: Video, token: string): Observable<any> {
    const url = this.apiUrl + 'video/new';
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this.httpClient.post(url, video, {headers});
  }

  getVideos(token: string, page?: number): Observable<any> {
    if (!page) {
      page = 1;
    }
    const url = this.apiUrl + 'videos?page=' + page;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this.httpClient.get(url, {headers});
  }

  getVideo(id: number, token: string): Observable<any> {
    const url = this.apiUrl + 'video/' + id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this.httpClient.get(url, {headers});
  }

  update(video: Video, token: string): Observable<any> {
    const url = this.apiUrl + 'video/edit/' + video.id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this.httpClient.put(url, video, {headers});
  }

  delete(id: number, token: string): Observable<any> {
    const url = this.apiUrl + 'video/' + id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this.httpClient.delete(url, {headers});
  }

}
