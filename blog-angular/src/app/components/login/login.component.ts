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
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
  }

}
