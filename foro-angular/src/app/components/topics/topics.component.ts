import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [ TopicService ]
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public topics: Topic[];
  public totalPages: number;
  public page: number;
  public next_page: number;
  public prev_page: number;
  public numberPages: number[];
  public notPaginate: boolean;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Temas';
    this.topics = [];
    this.totalPages = this.page = this.next_page = this.prev_page = 0;
    this.numberPages = [];
    this.notPaginate = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let page = +params.page;
      if (!page || page === null || page === undefined ) {
        page = 1;
      }
      this.getTopics(page);
    });
  }

  getTopics(page: number = 1): void {
    this._topicService.getTopics(page).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics.docs;
          this.totalPages = response.topics.totalPages;
          const numberPages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            numberPages.push(i);
          }
          this.numberPages = numberPages;
          this.page = response.topics.page;

          if (this.page > 2) {
            this.prev_page = this.page - 1;
          } else {
            this.prev_page = 1;
          }

          if (this.page < this.totalPages) {
            this.next_page = this.page + 1;
          } else {
            this.next_page = this.totalPages;
          }
        } else {
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
