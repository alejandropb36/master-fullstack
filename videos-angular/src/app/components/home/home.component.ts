import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pageTitle: string;
  public identity: any;
  public token: string;
  public videos: Video[];
  public status: string;
  public pagination: any;

  constructor(
    private userService: UserService,
    private videoService: VideoService
  ) {
    this.pageTitle = 'Inicio';
    this.token = '';
    this.status = '';
  }

  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos(this.token).subscribe(
      response => {
        this.status = response.status;
        if (this.status === 'success') {
          this.pagination = response.pagination;
          this.videos = response.videos;
          console.log(this.videos);
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );

  }

  getThumb(url: string, size: string) {
    var video, results, thumburl;

    if (url === null) {
      return '';
    }

    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    if (size != null) {
      thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
    } else {
      thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    }

    return thumburl;
  }

}
