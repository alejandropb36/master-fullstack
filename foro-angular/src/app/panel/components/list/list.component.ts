import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ UserService, TopicService ]
})
export class ListComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: string;
  public status: string;
  public topics: Array<Topic>;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Tus temas';
    this.identity = _userService.getIdentity();
    this.token = this._userService.getToken();
    this.status = '';
    this.topics = [];
  }

  ngOnInit(): void {
    this._topicService.getTopicsByUser(this.identity._id).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        if (this.status === 'success' && response. topics) {
          this.topics = response.topics;
          console.log(this.topics);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
