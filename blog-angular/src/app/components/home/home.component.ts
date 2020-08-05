import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  status: string;
  url: string;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.url = global.url;
    this.getPosts();
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
