import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-angular';
  identity: any;
  token: string;

  constructor(
    private userService: UserService
  ) {
    this.identity = this.userService.gteIdentity();
    this.token = this.userService.getToken();
  }


}
