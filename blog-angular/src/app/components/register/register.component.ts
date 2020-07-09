import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  page_title: string;
  user: User;
  constructor() {
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
    this.page_title = 'Registrate';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    console.log(this.user);
    form.reset();
  }

}
