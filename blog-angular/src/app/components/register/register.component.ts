import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  page_title: string;
  user: User;
  status: string;

  constructor(
    private userService: UserService
  ) {
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
    this.page_title = 'Registrate';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    console.log(this.user);

    this.userService.register(this.user).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = response.status;
          console.log(response);
          form.reset();

        } else {
          this.status = 'error'
        }

      },
      error => {
        this.status = 'error'
        console.log(error as any);
      }
    );

  }

}
