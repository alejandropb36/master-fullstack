import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(private userService: UserService) {
    this.pageTitle = 'Register';
    this.user = new User(null, '', '', '', '', 'ROLE_USER', null, false);
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.userService.register(this.user).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        if (this.status === 'success') {
          form.reset();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
