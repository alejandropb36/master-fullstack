import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css']
})
export class VideoNewComponent implements OnInit {

  public pageTitle: string;
  public video: Video;
  public identity: any;
  public token: string;
  public status: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.pageTitle = 'Guardar un nuevo video'
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.video = new Video(null, this.identity.sub, '', '', '', '', null, null);
    this.status = '';
  }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm): void {
    console.log(this.video);
  }
}
