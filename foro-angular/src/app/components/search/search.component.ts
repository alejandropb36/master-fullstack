import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public topics: Topic[];
  public page_title: string;
  public notPaginate: boolean;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.topics = [];
    this.page_title = 'Buscar: ';
    this.notPaginate = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const searchString = params.search;
      this.page_title = 'Buscar: ' + searchString;
      this.search(searchString);
    });
  }

  search(searchString: string): void {
    this.topicService.search(searchString).subscribe(
      response => {
        if (response.status === 'success' && response.topics) {
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
