import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['../add/add.component.css'],
  providers: [ UserService, TopicService ]
})
export class EditComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
  public identity: any;
  public token: string;
  public status: string;
  public topicId: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Editar tema';
    this.identity = _userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.status = '';
    this.topicId = '';
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(): void {
    this._route.params.subscribe((params: Params) => {
      if (params && params.id) {
        this.topicId = params.id;
        this._topicService.getTopic(this.topicId).subscribe(
          response => {
            if (response && response.status === 'success' && response.topic) {
              this.topic = response.topic;
            }
            if (response.status === 'error') {
              this._router.navigate(['/panel']);
            }
          },
          error => {
            console.log(error);
            this._router.navigate(['/panel']);
          }
        );
      }
    });
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }

}
