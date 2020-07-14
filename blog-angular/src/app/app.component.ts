import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'blog-angular';
  identity: any;
  token: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
  }

}
