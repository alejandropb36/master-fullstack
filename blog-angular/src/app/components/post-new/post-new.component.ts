import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/Post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  pageTitle: string;
  post: Post;
  identity: any;
  token: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.pageTitle = 'Crear nueva entrada';
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
    this.post = new Post(null, this.identity.sub, null, '', '', null, null);
    // console.log(this.post);
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }

}
