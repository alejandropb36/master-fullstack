import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ UserService, TopicService ]
})
export class AddComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
  public identity: any;
  public token: string;
  public status: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Crear nuevo tema';
    this.identity = _userService.getIdentity();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.token = this._userService.getToken();
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response => {
        this.status = response.status;
        if (this.status === 'success' && response.topic) {
          this.topic = response.topic;
          this._router.navigate(['/panel']);
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    )
  }

}
