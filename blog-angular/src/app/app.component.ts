import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.url = global.url;
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
  }

}
