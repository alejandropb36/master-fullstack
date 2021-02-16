import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { Comment } from 'src/app/models/comment';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { NgForm } from '@angular/forms';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [ TopicService, UserService ]
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public comment: Comment;
  public identity: any;
  public token: string;
  public status: string;
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private userService: UserService,
    private commentService: CommentService
  ) {
    this.topic = new Topic('', '', '', '', '', '', '', null);
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);
    this.status = '';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = params.id;
      this.getTopic(id);
    });
  }

  getTopic(id: string): void {
    this._topicService.getTopic(id).subscribe(
      response => {
        if (response.topic && response.status === 'success') {
          this.topic = response.topic;
        } else {
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
        this._router.navigate(['/inicio']);
      }
    );
  }

  onSubmit(form: NgForm): void {
    this.commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response => {
        this.status = response.status;
        if (this.status === 'success' && response.topic) {
          this.topic = response.topic;
          form.reset();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  deleteComment(commentId: string): void {
    this.commentService.delete(this.token, this.topic._id, commentId).subscribe(
      response => {
        if (response.status === 'success' && response.topic) {
          this.topic = response.topic;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
