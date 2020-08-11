import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.postService.getPost(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.post = response.post;
            console.log(this.post);
          } else {
            this.router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
          this.router.navigate(['inicio']);
        }
      );
    });
  }

}
