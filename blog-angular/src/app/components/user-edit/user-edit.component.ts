import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  pageTitle: string;
  status: string;

  constructor() { }

  ngOnInit(): void {
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
    this.pageTitle = 'Ajustes de usuario';
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
  }

}
