import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  public video: Video;
  public identity: any;
  public token: string;
  public status: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private videosService: VideoService,
    private _sanitizer: DomSanitizer
  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.video = null;
    this.status = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getVideo(id);
    });
  }

  getVideo(id: number): void {
    this.videosService.getVideo(id, this.token).subscribe(
      response => {
        if (response.status === 'success') {
          this.video = response.video;
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
        this.router.navigate(['/inicio']);
      }
    );
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }

}
