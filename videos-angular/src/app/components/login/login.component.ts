import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(private userService: UserService) {
    this.pageTitle = 'Login';
    this.user = new User(null, '', '', '', '', 'ROLE_USER', null);
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
  }

}
