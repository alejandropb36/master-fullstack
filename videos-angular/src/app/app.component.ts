import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'videos-angular';
  public token: string;
  public identity: any;

  constructor(
    private userService: UserService
  ) {
    this.identity = null;
    this.token = '';
  }


  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

}
