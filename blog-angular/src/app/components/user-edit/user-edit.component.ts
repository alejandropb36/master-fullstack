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
  froalaOptions: object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.identity = this.userService.gteIdentity();
    this.token  = this.userService.getToken();
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
    this.pageTitle = 'Ajustes de usuario';
    this.user = new User(
      this.identity.subl,
      this.identity.name,
      this.identity.surname,
      'ROLE_USER',
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
    this.userService.update(this.token, this.user).subscribe(
      response => {
        console.log(response);
        if (response.status === 'success') {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
