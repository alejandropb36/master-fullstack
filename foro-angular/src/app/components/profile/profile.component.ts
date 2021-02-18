import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Topic } from 'src/app/models/topic';
import { global } from 'src/app/services/global';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [TopicService, UserService]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public url: string;
  public topics: Topic[];

  constructor(
    private topicService: TopicService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', false);
    this.url = global.url;
    this.topics = [];
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const userId = params.id;
      this.getUser(userId);
      this.getTopics(userId);
    });
  }

  getUser(userId: string): void {
    this.userService.getUser(userId).subscribe(
      response => {
        if (response.status === 'success' && response.user) {
          this.user = response.user;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getTopics(userId: string): void {
    this.topicService.getTopicsByUser(userId).subscribe(
      response => {
        if (response.status === 'success' && response. topics) {
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
