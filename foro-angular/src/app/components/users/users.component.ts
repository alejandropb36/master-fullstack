import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];
  public url: string;

  constructor(
    private userService: UserService
  ) {
    this.users = [];
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        if (response && response.status == 'success') {
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
