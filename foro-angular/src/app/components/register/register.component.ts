import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
    this.status = '';
  }

  ngOnInit(): void {
    this._userService.prueba();
  }

  onSubmit(registerForm: NgForm): void {
    console.log(this.user);
    console.log(registerForm);
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          registerForm.reset();
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    )
  }

}
