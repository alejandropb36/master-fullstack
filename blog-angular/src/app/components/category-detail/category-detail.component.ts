import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: Post[];
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.url = global.url;
    this.page_title = '';
    this.getPostsByCategory();
  }

  getPostsByCategory(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.categoryService.getCategory(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.category = response.category;
            this.page_title = this.category.name;
            this.categoryService.getPosts(this.category.id).subscribe(
              response => {
                if (response.status === 'success') {
                  console.log(response);
                  this.posts = response.posts;
                } else {
                  this.router.navigate(['inicio']);
                }
              },
              error => {
                console.log(error);
              }
            );
          } else {
            this.router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
