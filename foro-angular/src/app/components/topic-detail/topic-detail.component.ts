import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [ TopicService ]
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.topic = new Topic('', '', '', '', '', '', '', null);
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

}
