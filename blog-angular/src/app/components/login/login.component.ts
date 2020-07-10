import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  token: string;
  identity: any;
  status: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
  }

  onSubmit(form: NgForm): void {
    this.userService.singup(this.user).subscribe(
      response => {
        if (response.status !== 'error') {
          this.status = 'success';
          this.token = response;
          this.userService.singup(this.user, true).subscribe(
            response => {
              this.identity = response;
              console.log(this.token);
              console.log(this.identity);
            },
            error => {
              console.log(error);
            }
          );
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

}
