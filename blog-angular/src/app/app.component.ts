import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { global } from './services/global';
import { Category } from './models/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'blog-angular';
  identity: any;
  token: string;
  url: string;
  categories: Category[];

  constructor(
    private userService: UserService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.url = global.url;
    this.getCategories();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(
      response => {
        if (response.status === 'success') {
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
