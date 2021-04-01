import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;

  constructor() {
    this.pageTitle = 'Register';
    this.user = new User(null, '', '', '', '', 'ROLE_USER', null);
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
  }

}
