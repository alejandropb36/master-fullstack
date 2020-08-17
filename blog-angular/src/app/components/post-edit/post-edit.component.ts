import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { NgForm } from '@angular/forms';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  pageTitle: string;
  post: Post;
  identity: any;
  token: string;
  status: string;
  froalaOptions: object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  categories: any[];
  afuConfig: object = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .jpeg',
    maxSize: '5',
    uploadAPI:  {
      url: `${global.url}posts/image`,
      method: 'POST',
      headers: {
        Authorization : `${this.userService.getToken()}`
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube la imagen de la entrada',
  };
  isEdit: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.pageTitle = 'Editar entrada';
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
    this.post = new Post(null, this.identity.sub, null, '', '', null, null);
    this.getCategories();
    this.getPost();
    this.isEdit = true;
  }

  onSubmit(form: NgForm): void {
    this.postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = 'success';
          this.post = response.post;
          this.router.navigate(['/entrada', this.post.id]);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      response => {
        if (response.status === 'success') {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  postUpload(datos): void {
    console.log(datos.response);
    const data = JSON.parse(datos.response);
    this.post.image = data.image;
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
