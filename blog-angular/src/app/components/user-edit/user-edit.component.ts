import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  identity: any;
  token: string;
  pageTitle: string;
  status: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.identity = this.userService.gteIdentity();
    this.token  = this.userService.getToken();
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
    this.pageTitle = 'Ajustes de usuario';
    this.user = this.identity;
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
  }

}
