import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public posts: Post[];
  public status: string;
  public token: string;
  public identity: any;
  public url: string;
  public user: User;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.identity = this.userService.gteIdentity();
    this.url = global.url;
    this.getProfile();
  }

  getProfile(): void {
    this.route.params.subscribe(params => {
      const userId  = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId: number): void {
    this.userService.getUser(userId).subscribe(
      response => {
        if (response.status === 'success') {
          this.user = response.user;
          console.log(this.user);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getPosts(userId: number): void {
    this.userService.getPosts(userId).subscribe(
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

  deletePost(id: number): void {
    this.postService.delete(this.token, id). subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }
    )
  }

}
