import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public identity: any;
  public token: string;

  constructor(private userService: UserService) {
    this.pageTitle = 'Editar usuario';
    this.status = '';
    this.identity  = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.email, '', 'ROLE_USER', null, false);
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
    // this.userService.register(this.user).subscribe(
    //   response => {
    //     console.log(response);
    //     this.status = response.status;
    //     if (this.status === 'success') {
    //       form.reset();
    //     }
    //   },
    //   error => {
    //     this.status = 'error';
    //     console.log(error);
    //   }
    // );
  }

}
