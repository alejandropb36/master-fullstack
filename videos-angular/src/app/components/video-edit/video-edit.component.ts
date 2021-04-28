import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  public pageTitle: string;
  public video: Video;
  public identity: any;
  public token: string;
  public status: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private videosService: VideoService
  ) {
    this.pageTitle = 'Editar video';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.video = new Video(null, this.identity.sub, '', '', '', '', null, null);
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
          this.pageTitle = 'Editar video - ' + this.video.title;
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

  onSubmit(form: NgForm): void {
    console.log(this.video);
    this.videosService.update(this.video, this.token).subscribe(
      response => {
        this.status = response.status;
        if (this.status === 'success') {
          this.video = response.video;
          this.pageTitle = 'Editar video - ' + this.video.title;
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }

}
