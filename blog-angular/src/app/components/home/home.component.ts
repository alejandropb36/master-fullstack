import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { global } from '../../services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  status: string;
  url: string;
  pageTitle: string;
  identity: any;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.url = global.url;
    this.getPosts();
    this.pageTitle = 'Posts';
    this.identity = this.userService.gteIdentity();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(
      response => {
        console.log(response);
        this.status = 'success';
        this.posts = response;
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
