import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/Category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  pageTitle: string;
  identity: any;
  token: string;
  category: Category;
  status: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = 'Crear categoria';
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
    this.category = new Category(null, '');

  }

  onSubmit(form: NgForm): void {
    console.log(form);
    console.log(this.category);
  }

}
