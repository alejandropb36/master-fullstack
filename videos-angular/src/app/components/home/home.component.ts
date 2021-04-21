import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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
  public page: number;
  public next_page: number;
  public prev_page: number;
  public number_pages: number;

  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pageTitle = 'Inicio';
    this.token = '';
    this.status = '';
  }

  ngOnInit(): void {
    this.loadUser();
    this.route.params.subscribe(params => {
      let page = +params.page;
      if (!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.getVideos(page);
    });
  }

  loadUser(): void {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  getVideos(page: number): void {
    this.videoService.getVideos(this.token, page).subscribe(
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
